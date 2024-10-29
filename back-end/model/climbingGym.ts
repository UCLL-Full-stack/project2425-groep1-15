export class ClimbingGym {
    private id?: number;
    private location: string;

    constructor(climbingGym: { id?: number; location: string }) {
        if (!this.isNotEmpty(climbingGym.location)) {
            throw new Error('Location cannot be empty.');
        }

        this.id = climbingGym.id;
        this.location = climbingGym.location;
    }

    private isNotEmpty(input: string): boolean {
        return input.trim().length > 0;
    }

    getId(): number | undefined {
        return this.id;
    }

    getLocation(): string {
        return this.location;
    }
}
