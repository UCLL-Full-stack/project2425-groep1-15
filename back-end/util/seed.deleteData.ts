// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';

const prisma = new PrismaClient();

const date1 = set(new Date(), { hours: 0, minutes: 0 });

const main = async () => {
    await prisma.user.deleteMany();
    await prisma.post.deleteMany();
    await prisma.boulderProblem.deleteMany();
    await prisma.climbingGym.deleteMany();
    await prisma.achievement.deleteMany();
};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
