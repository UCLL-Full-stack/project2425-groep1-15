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

const getAllClimbingGyms = async (): Promise<ClimbingGym[]> => {
    try {
        const climbingGymsPrisma = await database.climbingGym.findMany();
        return climbingGymsPrisma.map((climbingGymPrisma) => ClimbingGym.from(climbingGymPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createClimbingGym = async (climbingGym: ClimbingGym): Promise<ClimbingGym> => {
    try {
        const climbingGymPrisma = await database.climbingGym.create({
            data: {
                location: climbingGym.getLocation(),
                gymName: climbingGym.getGymName(),
            },
        });
        return ClimbingGym.from(climbingGymPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getClimbingGymById = async ({ id }: { id: number }): Promise<ClimbingGym | null> => {
    try {
        const climbingGymPrisma = await database.climbingGym.findUnique({
            where: { id },
        });
        return climbingGymPrisma ? ClimbingGym.from(climbingGymPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. see server log for details.');
    }
};

export default {
    getAllClimbingGyms,
    createClimbingGym,
    getClimbingGymById,
};
