// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.user.deleteMany();

    const joren = await prisma.user.create({
        data: {
            name: 'Joren',
            email: 'Joren.VanLaer@gmail.com',
            password: 'p',
            numPosts: 3,
        },
    });
    const nathan = await prisma.user.create({
        data: {
            name: 'Nathan',
            email: 'Nathan.DeKlerck@gmail.com',
            password: 'p',
            numPosts: 5,
        },
    });
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
