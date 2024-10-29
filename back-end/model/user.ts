export class User {
    private id?: number;
    private name: string;
    private email: string;
    private password: string;
    private startdate: Date;
    private numPosts: number;

    constructor(user: {
        id?: number;
        name: string;
        email: string;
        password: string;
        startdate: Date;
        numPosts: number;
    }) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.startdate = user.startdate;
        this.numPosts = user.numPosts;
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

    getStartdate(): Date {
        return this.startdate;
    }

    getNumposts(): number {
        return this.numPosts;
    }
}
