export class ClimbingGym {
    private id?: number;
    private location: string;
    private gymName: string;

    constructor(climbingGym: { id?: number; location: string; gymName: string }) {
        if (!this.isNotEmpty(climbingGym.location)) {
            throw new Error('Location cannot be empty.');
        }
        if (!this.isNotEmpty(climbingGym.gymName)) {
            throw new Error('Location cannot be empty.');
        }

        this.id = climbingGym.id;
        this.location = climbingGym.location;
        this.gymName = climbingGym.gymName;
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

    getGymName(): string {
        return this.gymName;
    }
}
