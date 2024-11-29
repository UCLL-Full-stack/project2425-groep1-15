import { BoulderProblem } from '../model/boulderProblem';
import { ClimbingGym } from '../model/climbingGym';
import database from './database';

const getAllBoulderProblems = async (): Promise<BoulderProblem[]> => {
    try {
        const boulderPrisma = await database.boulderProblem.findMany({
            include: {
                gym: true,
            },
        });
        return boulderPrisma.map((boulderPrisma) => BoulderProblem.from(boulderPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createBoulderProblem = async (boulderProblem: BoulderProblem): Promise<BoulderProblem> => {
    try {
        const gym = boulderProblem.getGym();
        const boulderProblemPrisma = await database.boulderProblem.create({
            data: {
                grade: boulderProblem.getGrade(),
                gym: {
                    create: {
                        location: gym.getLocation(),
                        gymName: gym.getGymName(),
                    },
                },
            },
            include: {
                gym: true,
            },
        });
        return BoulderProblem.from(boulderProblemPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
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
