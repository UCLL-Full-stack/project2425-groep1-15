import { ClimbingGym } from '../model/climbingGym';
import climbingGymDb from '../repository/climbingGym.db';

const getAllClimbingGyms = (): ClimbingGym[] => climbingGymDb.getAllClimbingGyms();

const createClimbingGym = (gymData: { location: string; gymName: string }): ClimbingGym => {
    const newClimbingGym = new ClimbingGym(gymData);
    return climbingGymDb.createClimbingGym(newClimbingGym);
};

export default {
    getAllClimbingGyms,
    createClimbingGym,
};
