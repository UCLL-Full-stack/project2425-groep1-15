import { BoulderProblem } from '../model/boulderProblem';
import { ClimbingGym } from '../model/climbingGym';
import { Post } from '../model/post';
import { set } from 'date-fns';
import database from './database';
import { User } from '../model/user';

const getAllPosts = async (): Promise<Post[]> => {
    try {
        const postPrisma = await database.post.findMany({
            include: {
                boulder: {
                    include: {
                        gym: true,
                    },
                },
                image: true,
                user: { include: { achievements: true } },
            },
        });

        return postPrisma.map((postPrisma) => Post.from(postPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createPost = async (post: Post): Promise<Post> => {
    try {
        const postPrisma = await database.post.create({
            data: {
                title: post.getTitle(),
                comment: post.getComment(),
                date: post.getDate(),
                boulder: {
                    connect: { id: post.getBoulder().getId() },
                },
                image: { connect: { id: post.getImage().getId() } },
                user: { connect: { id: post.getUser().getId() } },
            },
            include: {
                boulder: { include: { gym: true } },
                image: true,
                user: { include: { achievements: true } },
            },
        });
        return Post.from(postPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getPostById = async ({ id }: { id: number }): Promise<Post | null> => {
    try {
        const postPrisma = await database.post.findUnique({
            where: { id },
            include: {
                image: true,
                boulder: { include: { gym: true } },
                user: { include: { achievements: true } },
            },
        });
        return postPrisma ? Post.from(postPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const updatePost = async (existingPostId: number, newPost: Post): Promise<Post> => {
    try {
        const PostPrisma = await database.post.update({
            where: { id: existingPostId },
            data: {
                title: newPost.getTitle(),
                comment: newPost.getComment(),
                date: newPost.getDate(),
                boulder: {
                    connect: { id: newPost.getBoulder().getId() },
                },
                image: {
                    connect: { id: newPost.getImage().getId() },
                },
                user: {
                    connect: { id: newPost.getUser().getId() },
                },
            },
            include: {
                boulder: { include: { gym: true } },
                image: true,
                user: { include: { achievements: true } },
            },
        });

        return Post.from(PostPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getPostsByUser = async ({ user }: { user: User }): Promise<Post[]> => {
    try {
        const postPrisma = await database.post.findMany({
            where: { userId: user.getId() },
            include: {
                image: true,
                boulder: { include: { gym: true } },
                user: { include: { achievements: true } },
            },
        });
        return postPrisma.map((postPrisma) => Post.from(postPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const deletePostById = async (id: number) => {
    try {
        const postPrisma = await database.post.delete({
            where: { id: id },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllPosts,
    createPost,
    getPostById,
    updatePost,
    getPostsByUser,
    deletePostById,
};
