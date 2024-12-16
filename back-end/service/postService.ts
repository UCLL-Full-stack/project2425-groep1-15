import path from 'path';
import { BoulderProblem } from '../model/boulderProblem';
import { ClimbingGym } from '../model/climbingGym';
import { Image } from '../model/image';
import { Post } from '../model/post';
import boulderProblemDb from '../repository/boulderProblem.db';
import postDb from '../repository/post.db';
import { PostInput } from '../types';
import imageDb from '../repository/image.db';
import userDb from '../repository/user.db';

const getAllPosts = async (): Promise<Post[]> => await postDb.getAllPosts();

const getPostById = async (id: number): Promise<Post> => {
    const post = await postDb.getPostById({ id });
    if (!post) throw new Error(`Post with id ${id} does not exist.`);
    return post;
};

const createPost = async ({
    title,
    comment,
    date,
    boulder: boulderInput,
    image: imageInput,
    user: userInput,
}: PostInput): Promise<Post> => {
    const newboulder = new BoulderProblem({
        grade: boulderInput.grade,
        gym: new ClimbingGym({
            location: boulderInput.gym.location,
            gymName: boulderInput.gym.gymName,
        }),
    });

    const newImage = new Image({
        fileName: imageInput.fileName,
        path: imageInput.path,
    });

    const userEmail = userInput.email;

    const user = await userDb.getUserByEmail(userEmail);
    if (!user) {
        throw new Error(`User with email ${userEmail} does not exist`);
    }

    const boulder = await boulderProblemDb.createBoulderProblem(newboulder);
    const image = await imageDb.createImage(newImage);

    const newPost = new Post({ title, comment, date, boulder, image, user });
    return await postDb.createPost(newPost);
};

export default { getAllPosts, createPost, getPostById };
