import { BoulderProblem } from '../model/boulderProblem';
import { ClimbingGym } from '../model/climbingGym';

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

export default {
    getAllBoulderProblems,
    createBoulderProblem,
};
