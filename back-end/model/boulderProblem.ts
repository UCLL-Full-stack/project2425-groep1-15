export class BoulderProblem {
    private id?: number;
    private grade: string;

    constructor(boulderProblem: { id?: number; grade: string }) {
        this.id = boulderProblem.id;
        this.grade = boulderProblem.grade;
    }

    getId(): number | undefined {
        return this.id;
    }

    getGrade(): string {
        return this.grade;
    }
}
