import { BoulderProblem } from '../model/boulderProblem';
import { ClimbingGym } from '../model/climbingGym';
import boulderProblemDb from '../repository/boulderProblem.db';
import climbingGymDb from '../repository/climbingGym.db';

const getAllBoulderProblems = (): BoulderProblem[] => boulderProblemDb.getAllBoulderProblems();

const createBoulderProblem = (boulderData: { grade: string; gym: ClimbingGym }): BoulderProblem => {
    const newBoulderProblem = new BoulderProblem(boulderData);
    return boulderProblemDb.createBoulderProblem(newBoulderProblem);
};

export default {
    getAllBoulderProblems,
    createBoulderProblem,
};
