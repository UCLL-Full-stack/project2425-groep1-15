import { ClimbingGym } from '../model/climbingGym';
import climbingGymDb from '../repository/climbingGym.db';

const getAllClimbingGyms = (): ClimbingGym[] => climbingGymDb.getAllClimbingGyms();

const createClimbingGym = (gymData: { location: string; gymName: string }): ClimbingGym => {
    const newClimbingGym = new ClimbingGym(gymData);
    return climbingGymDb.createClimbingGym(newClimbingGym);
};

const getClimbingGymByName = (gymName: string): ClimbingGym => {
    const gym = climbingGymDb.getClimbingGymByName({ gymName });
    if (!gym) throw new Error(`Gym with name ${gymName} does not exist.`);
    return gym;
};

export default {
    getAllClimbingGyms,
    createClimbingGym,
    getClimbingGymByName,
};
