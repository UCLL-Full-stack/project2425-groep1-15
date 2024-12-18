import { Achievement as AchievementPrisma, Post, User as UserPrisma } from '@prisma/client';
import { Role } from '../types';
import { Achievement } from './achievement';

export class User {
    private id?: number;
    private name: string;
    private email: string;
    private password: string;
    private role: Role;
    private achievements: Achievement[];

    constructor(user: {
        id?: number;
        name: string;
        email: string;
        password: string;
        role?: Role;
        achievements: Achievement[];
    }) {
        if (!this.isNotEmpty(user.name)) {
            throw new Error('Name cannot be empty.');
        }

        if (!this.isValidEmail(user.email)) {
            throw new Error('Invalid email format.');
        }

        if (!this.isNotEmpty(user.password)) {
            throw new Error('Password cannot be empty.');
        }

        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role || 'user';
        this.achievements = user.achievements;
    }

    private isNotEmpty(input: string): boolean {
        return input.trim().length > 0;
    }

    private isValidEmail(email: string): boolean {
        const atIndex = email.indexOf('@');
        const dotIndex = email.lastIndexOf('.');

        return (
            this.isNotEmpty(email) &&
            atIndex > 0 &&
            dotIndex > atIndex + 1 &&
            dotIndex < email.length - 1
        );
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    getRole(): Role {
        return this.role;
    }

    getAchievements(): Achievement[] {
        return this.achievements;
    }

    static from({
        id,
        name,
        email,
        password,
        role,
        achievements,
    }: UserPrisma & {
        achievements: AchievementPrisma[];
    }) {
        return new User({
            id,
            name,
            email,
            password,
            role: role as Role,
            achievements: achievements.map((achievement) => Achievement.from(achievement)),
        });
    }
}
