import { ClimbingGym } from './climbingGym';
import { BoulderProblem as BoulderPrisma } from '@prisma/client';
import { ClimbingGym as ClimbingGymPrisma } from '@prisma/client';

export class BoulderProblem {
    private id?: number;
    private grade: string;
    private gym: ClimbingGym;

    constructor(boulderProblem: { id?: number; grade: string; gym: ClimbingGym }) {
        this.validate(boulderProblem);

        this.id = boulderProblem.id;
        this.grade = boulderProblem.grade;
        this.gym = boulderProblem.gym;
    }

    validate(boulderProblem: { grade: string; gym: ClimbingGym }) {
        if (!this.isNotEmpty(boulderProblem.grade)) {
            throw new Error('Grade cannot be empty.');
        }

        if (!boulderProblem.gym) {
            throw new Error('ClimbingGym cannot be empty.');
        }
        const gradePattern = /^V\d{1,2}$/;
        if (!gradePattern.test(boulderProblem.grade)) {
            throw new Error('Grade must start with "v" followed by 1 or 2 numbers.');
        }
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

    static from({
        id,
        grade,
        gym,
    }: BoulderPrisma & {
        gym: ClimbingGymPrisma;
    }) {
        return new BoulderProblem({
            id,
            grade,
            gym: ClimbingGym.from(gym),
        });
    }
}
