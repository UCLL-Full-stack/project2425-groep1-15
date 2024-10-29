export class User {
    private id?: number;
    private grade: string;

    constructor(user: { id?: number; grade: string }) {
        this.id = user.id;
        this.grade = user.grade;
    }

    getId(): number | undefined {
        return this.id;
    }

    getGrade(): string {
        return this.grade;
    }
}
