import { Image as ImagePrisma, Post as PostPrisma } from '@prisma/client';
import { Post } from './post';

export class Image {
    private id?: number;
    private fileName: string;
    private path: string;

    constructor(image: { id?: number; fileName: string; path: string }) {
        if (!this.isNotEmpty(image.fileName)) {
            throw new Error('fileName cannot be empty.');
        }
        if (!this.isNotEmpty(image.path)) {
            throw new Error('path cannot be empty.');
        }
        this.id = image.id;
        this.fileName = image.fileName;
        this.path = image.path;
    }

    private isNotEmpty(input: string): boolean {
        return input.trim().length > 0;
    }

    getId(): number | undefined {
        return this.id;
    }
    getFileName(): string {
        return this.fileName;
    }

    getPath(): string {
        return this.path;
    }

    static from({ id, fileName, path }: ImagePrisma) {
        return new Image({
            id,
            fileName,
            path,
        });
    }
}
