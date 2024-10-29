export class BoulderProblem {
    private id?: number;
    private grade: string;

    constructor(boulderProblem: { id?: number; grade: string }) {
        if (!this.isNotEmpty(boulderProblem.grade)) {
            throw new Error('Grade cannot be empty.');
        }

        this.id = boulderProblem.id;
        this.grade = boulderProblem.grade;
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
}
