import { Achievement } from '../model/achievement';
import { set } from 'date-fns';
import database from './database';
import { User } from '../model/user';

const getAllAchievements = async (): Promise<Achievement[]> => {
    try {
        const achievementPrisma = await database.achievement.findMany({});

        return achievementPrisma.map((achievementPrisma) => Achievement.from(achievementPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createAchievement = async (achievement: Achievement): Promise<Achievement> => {
    try {
        const achievementPrisma = await database.achievement.create({
            data: {
                title: achievement.getTitle(),
                description: achievement.getDescription(),
                difficulty: achievement.getDifficulty(),
            },
        });
        return Achievement.from(achievementPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllAchievements,
    createAchievement,
};
