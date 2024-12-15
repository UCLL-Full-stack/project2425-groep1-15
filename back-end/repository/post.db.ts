import { BoulderProblem } from '../model/boulderProblem';
import { ClimbingGym } from '../model/climbingGym';
import { Post } from '../model/post';
import { set } from 'date-fns';
import database from './database';

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
            },
            include: {
                boulder: { include: { gym: true } },
                image: true,
            },
        });
        return Post.from(postPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllPosts,
    createPost,
};
