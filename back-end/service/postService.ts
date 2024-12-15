import path from 'path';
import { BoulderProblem } from '../model/boulderProblem';
import { ClimbingGym } from '../model/climbingGym';
import { Image } from '../model/image';
import { Post } from '../model/post';
import boulderProblemDb from '../repository/boulderProblem.db';
import postDb from '../repository/post.db';
import { PostInput } from '../types';
import imageDb from '../repository/image.db';

const getAllPosts = async (): Promise<Post[]> => await postDb.getAllPosts();

const createPost = async ({
    title,
    comment,
    date,
    boulder: boulderInput,
    image: imageInput,
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

    const boulder = await boulderProblemDb.createBoulderProblem(newboulder);
    const image = await imageDb.createImage(newImage);

    const newPost = new Post({ title, comment, date, boulder, image });
    return await postDb.createPost(newPost);
};

export default { getAllPosts, createPost };
