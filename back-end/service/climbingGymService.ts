import { ClimbingGym } from '../model/climbingGym';
import climbingGymDb from '../repository/climbingGym.db';
import { ClimbingGymInput } from '../types';

const getAllClimbingGyms = async (): Promise<ClimbingGym[]> => climbingGymDb.getAllClimbingGyms();

const createClimbingGym = async ({ location, gymName }: ClimbingGymInput): Promise<ClimbingGym> => {
    const climbingGym = new ClimbingGym({ location, gymName });
    return await climbingGymDb.createClimbingGym(climbingGym);
};

const getClimbingGymById = async (id: number): Promise<ClimbingGym> => {
    const gym = await climbingGymDb.getClimbingGymById({ id });
    if (!gym) throw new Error(`Gym with name ${id} does not exist.`);
    return gym;
};

const editClimbingGym = async (
    { location, gymName }: ClimbingGymInput,
    id: number
): Promise<ClimbingGym> => {
    const oldClimbingGym = await getClimbingGymById(id);
    const newLocation = location || oldClimbingGym.getLocation();
    const newgymName = gymName || oldClimbingGym.getGymName();

    const newClimbingGym = new ClimbingGym({
        location: newLocation,
        gymName: newgymName,
    });

    return await climbingGymDb.updateClimbingGym(id, newClimbingGym);
};

export default {
    getAllClimbingGyms,
    createClimbingGym,
    getClimbingGymById,
    editClimbingGym,
};
