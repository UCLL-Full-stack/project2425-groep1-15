export class Achievement {
    private id?: number;
    private title: string;
    private description: string;
    private difficulty: string;

    constructor(achievement: {
        id?: number;
        title: string;
        description: string;
        difficulity: string;
    }) {
        this.id = achievement.id;
        this.title = achievement.title;
        this.description = achievement.description;
        this.difficulty = achievement.difficulity;
    }

    getId(): number | undefined {
        return this.id;
    }

    getTitle(): string {
        return this.title;
    }

    getDescription(): string {
        return this.description;
    }

    getDifficulty(): string {
        return this.difficulty;
    }
}
