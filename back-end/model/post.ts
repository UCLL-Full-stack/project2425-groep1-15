export class Post {
    private id?: number;
    private title: string;
    private comment: string;
    private date: Date;

    constructor(post: { id?: number; title: string; comment: string; date: Date }) {
        this.id = post.id;
        this.title = post.title;
        this.comment = post.comment;
        this.date = post.date;
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
