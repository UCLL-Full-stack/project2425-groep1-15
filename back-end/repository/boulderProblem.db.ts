import { BoulderProblem } from '../model/boulderProblem';
import { ClimbingGym } from '../model/climbingGym';
import database from './database';

const climbingGyms = [
    new ClimbingGym({
        location: 'Herent',
        gymName: 'Boulder One',
    }),
    new ClimbingGym({
        location: 'Leuven',
        gymName: 'Monkeys',
    }),
];

const boulderProblems = [
    new BoulderProblem({
        grade: 'V5',
        gym: climbingGyms[0],
    }),
    new BoulderProblem({
        grade: 'V7',
        gym: climbingGyms[1],
    }),
];

const getAllBoulderProblems = (): BoulderProblem[] => boulderProblems;

const createBoulderProblem = (boulder: BoulderProblem): BoulderProblem => {
    const newBoulderProblem = new BoulderProblem({
        grade: boulder.getGrade(),
        gym: boulder.getGym(),
    });
    boulderProblems.push(newBoulderProblem);
    return newBoulderProblem;
};

const getBoulderById = async (id: number): Promise<BoulderProblem | null> => {
    try {
        const boulderPrisma = await database.boulderProblem.findUnique({
            where: { id },
            include: {
                gym: true,
            },
        });

        if (boulderPrisma) {
            return BoulderProblem.from(boulderPrisma);
        }
        return null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllBoulderProblems,
    createBoulderProblem,
    getBoulderById,
};
