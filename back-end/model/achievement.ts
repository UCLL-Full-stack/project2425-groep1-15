export class Achievement {
    private id?: number;
    private title: string;
    private description: string;
    private difficulty: string;

    constructor(achievement: {
        id?: number;
        title: string;
        description: string;
        difficulty: string;
    }) {
        if (!this.isNotEmpty(achievement.title)) {
            throw new Error('Title cannot be empty.');
        }

        if (!this.isNotEmpty(achievement.description)) {
            throw new Error('Description cannot be empty.');
        }

        if (!this.checkdifficulty(achievement.difficulty)) {
            throw new Error('Difficulty has to be easy, medium, hard or extreme.');
        }
        this.id = achievement.id;
        this.title = achievement.title;
        this.description = achievement.description;
        this.difficulty = achievement.difficulty;
    }

    private isNotEmpty(input: string): boolean {
        return input.trim().length > 0;
    }

    private checkdifficulty(difficulty: string): boolean {
        return ['easy', 'medium', 'hard', 'extreme'].includes(difficulty);
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
