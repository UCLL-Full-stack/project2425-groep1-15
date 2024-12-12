import { User as UserPrisma } from '@prisma/client';
import { Role } from '../types';

export class User {
    private id?: number;
    private name: string;
    private email: string;
    private password: string;
    private numPosts: number;
    private role: Role;

    constructor(user: {
        id?: number;
        name: string;
        email: string;
        password: string;
        numPosts: number;
        role?: Role;
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

        if (!this.isValidNumPosts(user.numPosts)) {
            throw new Error('Number of posts cannot be a negative number');
        }

        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.numPosts = user.numPosts;
        this.role = user.role || 'user';
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

    private isValidNumPosts(numPosts: number): boolean {
        return numPosts >= 0;
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

    getNumposts(): number {
        return this.numPosts;
    }

    getRole(): Role {
        return this.role;
    }
    static from({ id, name, email, password, numPosts, role }: UserPrisma) {
        return new User({
            id,
            name,
            email,
            password,
            numPosts,
            role: role as Role,
        });
    }
}
