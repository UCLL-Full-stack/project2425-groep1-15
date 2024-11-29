import { BoulderProblem } from '../model/boulderProblem';
import { ClimbingGym } from '../model/climbingGym';
import boulderProblemDb from '../repository/boulderProblem.db';
import climbingGymDb from '../repository/climbingGym.db';
import { BoulderProblemInput, ClimbingGymInput } from '../types';

const getAllBoulderProblems = async (): Promise<BoulderProblem[]> =>
    await boulderProblemDb.getAllBoulderProblems();

const createBoulderProblem = async ({
    grade,
    gym: climbingGymInput,
}: BoulderProblemInput): Promise<BoulderProblem> => {
    const gym = new ClimbingGym({
        location: climbingGymInput.location,
        gymName: climbingGymInput.gymName,
    });

    const newBoulder = new BoulderProblem({ grade, gym });
    return await boulderProblemDb.createBoulderProblem(newBoulder);
};

export default {
    getAllBoulderProblems,
    createBoulderProblem,
};
