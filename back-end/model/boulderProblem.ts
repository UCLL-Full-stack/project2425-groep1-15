import { ClimbingGym } from './climbingGym';

export class BoulderProblem {
    private id?: number;
    private grade: string;
    private gym: ClimbingGym;

    constructor(boulderProblem: { id?: number; grade: string; gym: ClimbingGym }) {
        if (!this.isNotEmpty(boulderProblem.grade)) {
            throw new Error('Grade cannot be empty.');
        }

        this.id = boulderProblem.id;
        this.grade = boulderProblem.grade;
        this.gym = boulderProblem.gym;
    }

    private isNotEmpty(input: string): boolean {
        return input.trim().length > 0;
    }

    getId(): number | undefined {
        return this.id;
    }

    getGrade(): string {
        return this.grade;
    }

    getGym(): ClimbingGym {
        return this.gym;
    }
}
