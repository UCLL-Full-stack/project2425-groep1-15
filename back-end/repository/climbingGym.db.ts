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

const getAllClimbingGyms = (): ClimbingGym[] => climbingGyms;

const createClimbingGym = (gym: ClimbingGym): ClimbingGym => {
    const newClimbingGym = new ClimbingGym({
        location: gym.getLocation(),
        gymName: gym.getGymName(),
    });
    climbingGyms.push(newClimbingGym);
    return newClimbingGym;
};

const getClimbingGymByName = ({ gymName }: { gymName: string }): ClimbingGym | null => {
    return climbingGyms.find((gym) => gym.getGymName() === gymName) || null;
};

export default {
    getAllClimbingGyms,
    createClimbingGym,
    getClimbingGymByName,
};
