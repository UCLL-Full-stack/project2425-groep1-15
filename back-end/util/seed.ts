// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';

const prisma = new PrismaClient();

const date1 = set(new Date(), { hours: 0, minutes: 0 });

const main = async () => {
    await prisma.user.deleteMany();

    const joren = await prisma.user.create({
        data: {
            name: 'Joren',
            email: 'Joren.VanLaer@gmail.com',
            password: await bcrypt.hash('p', 12),
            numPosts: 3,
        },
    });
    const nathan = await prisma.user.create({
        data: {
            name: 'Nathan',
            email: 'Nathan.DeKlerck@gmail.com',
            password: await bcrypt.hash('p', 12),
            numPosts: 5,
        },
    });

    const boulderHerent = await prisma.climbingGym.create({
        data: {
            location: 'herent',
            gymName: 'Boulder One',
        },
    });

    const boulderLeuven = await prisma.climbingGym.create({
        data: {
            location: 'Leuven',
            gymName: 'Monkeys',
        },
    });

    const broccoliPlant = await prisma.boulderProblem.create({
        data: {
            grade: 'V9',
            gym: {
                connect: { id: boulderHerent.id },
            },
            posts: {
                create: [],
            },
        },
    });

    const post1 = await prisma.post.create({
        data: {
            title: 'Eerste Post',
            comment: 'Dit is de eerste post',
            date: date1,
            boulder: {
                connect: { id: broccoliPlant.id },
            },
        },
    });

    const post2 = await prisma.post.create({
        data: {
            title: 'Tweede Post',
            comment: 'Dit is de tweede post',
            date: date1,
            boulder: {
                connect: { id: broccoliPlant.id },
            },
        },
    });

    const achievement1 = await prisma.achievement.create({
        data: {
            title: 'Eerste achievement',
            description: 'Dit is de eerste achievement',
            difficulty: 'extreem',
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
