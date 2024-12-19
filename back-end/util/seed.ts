// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';
import path from 'path';

const prisma = new PrismaClient();

const date1 = set(new Date(), { hours: 0, minutes: 0 });

const baseDir = path.resolve(__dirname, '../front-end/public/pictures');

const main = async () => {
    await prisma.post.deleteMany();
    await prisma.boulderProblem.deleteMany();
    await prisma.climbingGym.deleteMany();
    await prisma.achievement.deleteMany();
    await prisma.user.deleteMany();

    const achievement1 = await prisma.achievement.create({
        data: {
            title: 'First Post Uploaded',
            description: 'You uploaded your first post, congratulations!',
            difficulty: 'easy',
        },
    });

    const achievement2 = await prisma.achievement.create({
        data: {
            title: 'On A Roll!',
            description: 'You uploaded 3 posts in one day! WOW',
            difficulty: 'hard',
        },
    });

    const joren = await prisma.user.create({
        data: {
            name: 'Joren',
            email: 'Joren.VanLaer@gmail.com',
            password: await bcrypt.hash('Joren123', 12),
            achievements: {
                connect: {
                    id: achievement1.id,
                },
            },
        },
    });

    await prisma.user.update({
        where: { id: joren.id },
        data: {
            achievements: {
                connect: {
                    id: achievement2.id,
                },
            },
        },
    });
    const nathan = await prisma.user.create({
        data: {
            name: 'Nathan',
            email: 'Nathan.DeKlerck@gmail.com',
            password: await bcrypt.hash('Nathan123', 12),
        },
    });

    const alexandre = await prisma.user.create({
        data: {
            name: 'Alexandre',
            email: 'Alexandre.VanAerschot@gmail.com',
            password: await bcrypt.hash('Alexandre123', 12),
            role: 'VIP',
        },
    });

    const johan = await prisma.user.create({
        data: {
            name: 'Johan',
            email: 'Johan.Pieck@gmail.com',
            password: await bcrypt.hash('Johan123', 12),
            role: 'admin',
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
            path: '/pictures/indoorBoulder.jpg',
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
            user: {
                connect: { id: alexandre.id },
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
            user: {
                connect: { id: nathan.id },
            },
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
