import { BoulderProblem } from './boulderProblem';
import { Image } from './image';
import { User } from './user';
import {
    ClimbingGym as ClimbingGymPrisma,
    Post as PostPrisma,
    Image as ImagePrisma,
    User as UserPrisma,
    Achievement as AchievementPrisma,
} from '@prisma/client';
import { BoulderProblem as BoulderPrisma } from '@prisma/client';

export class Post {
    private id?: number;
    private title: string;
    private comment: string;
    private date: Date;
    private boulder: BoulderProblem;
    private image: Image;
    private user: User;

    constructor(post: {
        id?: number;
        title: string;
        comment: string;
        date: Date;
        boulder: BoulderProblem;
        image: Image;
        user: User;
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
        this.image = post.image;
        this.user = post.user;
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

    getImage(): Image {
        return this.image;
    }

    getUser(): User {
        return this.user;
    }

    static from({
        id,
        title,
        comment,
        date,
        boulder,
        image,
        user,
    }: PostPrisma & {
        boulder: BoulderPrisma & {
            gym: ClimbingGymPrisma;
        };
        image: ImagePrisma;
        user: UserPrisma & {
            achievements: AchievementPrisma[];
        };
    }) {
        return new Post({
            id,
            title,
            comment,
            date,
            boulder: BoulderProblem.from(boulder),
            image: Image.from(image),
            user: User.from(user),
        });
    }
}
