// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';
import path from 'path';

const prisma = new PrismaClient();

const date1 = set(new Date(), { hours: 0, minutes: 0 });

const baseDir = path.resolve(__dirname, '../front-end/public/pictures');

const main = async () => {
    await prisma.user.deleteMany();
    await prisma.post.deleteMany();
    await prisma.boulderProblem.deleteMany();
    await prisma.climbingGym.deleteMany();
    await prisma.achievement.deleteMany();

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

    const image1 = await prisma.image.create({
        data: {
            fileName: 'Image1',
            path: '/pictures/boulder.jpg',
        },
    });

    const image2 = await prisma.image.create({
        data: {
            fileName: 'Image2',
            path: '/pictures/bird.jpg',
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
            image: {
                connect: { id: image1.id },
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
            image: {
                connect: { id: image2.id },
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
