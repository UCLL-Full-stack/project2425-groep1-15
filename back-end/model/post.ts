export class Post {
    private id?: number;
    private title: string;
    private comment: string;
    private date: Date;

    constructor(post: { id?: number; title: string; comment: string; date: Date }) {
        if (!this.isNotEmpty(post.title)) {
            throw new Error('Title cannot be empty.');
        }

        if (!this.isNotEmpty(post.comment)) {
            throw new Error('Comment cannot be empty.');
        }

        this.id = post.id;
        this.title = post.title;
        this.comment = post.comment;
        this.date = post.date;
    }

    private isNotEmpty(input: string): boolean {
        return input.trim().length > 0;
    }

    getId(): number | undefined {
        return this.id;
    }

    getTitle(): string {
        return this.title;
    }

    getComment(): string {
        return this.comment;
    }

    getDate(): Date {
        return this.date;
    }
}
