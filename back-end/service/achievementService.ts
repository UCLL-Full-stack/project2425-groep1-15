import { Achievement } from '../model/achievement';
import { User } from '../model/user';
import achievementDb from '../repository/achievement.db';
import { AchievementInput } from '../types';

const getAllAchievements = async (): Promise<Achievement[]> =>
    await achievementDb.getAllAchievements();

// const getAchievementsByUser = async (user: User): Promise<Achievement[]> => {
//     const achievements = await achievementDb.getAchievementsByUser({ user });
//     return achievements;
// };

const createAchievement = async ({
    title,
    description,
    difficulty,
}: AchievementInput): Promise<Achievement> => {
    const newAchievement = new Achievement({ title, description, difficulty });
    return await achievementDb.createAchievement(newAchievement);
};

export default { getAllAchievements, createAchievement };
