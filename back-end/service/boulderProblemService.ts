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

const getBoulderProblemById = async (id: number): Promise<BoulderProblem> => {
    const post = await boulderProblemDb.getBoulderById(id);
    if (!post) throw new Error(`BoulderProblem with id ${id} does not exist.`);
    return post;
};

const editBoulderProblem = async (
    { grade, gym: climbingGymInput }: BoulderProblemInput,
    id: number
): Promise<BoulderProblem> => {
    const oldBoulderProblem = await getBoulderProblemById(id);
    const newGrade = grade || oldBoulderProblem.getGrade();
    const newClimbingGym = climbingGymInput
        ? new ClimbingGym({
              id: oldBoulderProblem.getGym().getId(),
              location: climbingGymInput.location || oldBoulderProblem.getGym().getLocation(),
              gymName: climbingGymInput.gymName || oldBoulderProblem.getGym().getGymName(),
          })
        : oldBoulderProblem.getGym();

    const newBoulderProblem = new BoulderProblem({
        id: oldBoulderProblem.getId(),
        grade: newGrade,
        gym: newClimbingGym,
    });

    return await boulderProblemDb.updateBoulderProblem(id, newBoulderProblem);
};

export default {
    getAllBoulderProblems,
    createBoulderProblem,
    editBoulderProblem,
    getBoulderProblemById,
};
