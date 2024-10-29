export class ClimbingGym {
    private id?: number;
    private location: string;

    constructor(climbingGym: { id?: number; location: string }) {
        this.id = climbingGym.id;
        this.location = climbingGym.location;
    }

    getId(): number | undefined {
        return this.id;
    }

    getLocation(): string {
        return this.location;
    }
}
