import { BoulderProblem } from './boulderProblem';
import { ClimbingGym as ClimbingGymPrisma, Post as PostPrisma } from '@prisma/client';
import { BoulderProblem as BoulderPrisma } from '@prisma/client';

export class Post {
    private id?: number;
    private title: string;
    private comment: string;
    private date: Date;
    private boulder: BoulderProblem;

    constructor(post: {
        id?: number;
        title: string;
        comment: string;
        date: Date;
        boulder: BoulderProblem;
    }) {
        if (!this.isNotEmpty(post.title)) {
            throw new Error('Title cannot be empty.');
        }

        if (!this.isNotEmpty(post.comment)) {
            throw new Error('Comment cannot be empty.');
        }

        this.id = post.id;
        this.title = post.title;
        this.comment = post.comment;
        this.date = post.date;
        this.boulder = post.boulder;
    }

    private isNotEmpty(input: string): boolean {
        return input.trim().length > 0;
    }

    getId(): number | undefined {
        return this.id;
    }

    getTitle(): string {
        return this.title;
    }

    getComment(): string {
        return this.comment;
    }

    getDate(): Date {
        return this.date;
    }

    getBoulder(): BoulderProblem {
        return this.boulder;
    }

    static from({
        id,
        title,
        comment,
        date,
        boulder,
    }: PostPrisma & {
        boulder: BoulderPrisma & {
            gym: ClimbingGymPrisma;
        };
    }) {
        return new Post({
            id,
            title,
            comment,
            date,
            boulder: BoulderProblem.from(boulder),
        });
    }
}
