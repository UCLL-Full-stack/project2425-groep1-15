import { Achievement } from '../model/achievement';
import achievementDb from '../repository/achievement.db';

const getAllAchievements = (): Achievement[] => achievementDb.getAllAchievements();

const createAchievement = (AchievementData: {
    title: string;
    description: string;
    difficulty: string;
}): Achievement => {
    const newAchievement = new Achievement(AchievementData);
    return achievementDb.createAchievement(newAchievement);
};

export default { getAllAchievements, createAchievement };
