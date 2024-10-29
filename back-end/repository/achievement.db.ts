import { Achievement } from '../model/achievement';
import { set } from 'date-fns';

const achievements = [
    new Achievement({
        title: 'baby steps',
        description: 'complete a boulder problem',
        difficulty: 'easy',
    }),
    new Achievement({
        title: 'getting harder',
        description: 'complete 5 different V6 boulder problems',
        difficulty: 'hard',
    }),
];

const getAllAchievements = (): Achievement[] => achievements;

const createAchievement = (achievement: Achievement): Achievement => {
    const newAchievement = new Achievement({
        title: achievement.getTitle(),
        description: achievement.getDescription(),
        difficulty: achievement.getDifficulty(),
    });
    achievements.push(newAchievement);
    return newAchievement;
};

export default {
    getAllAchievements,
    createAchievement,
};
