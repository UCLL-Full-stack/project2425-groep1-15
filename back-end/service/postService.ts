import { BoulderProblem } from '../model/boulderProblem';
import { ClimbingGym } from '../model/climbingGym';
import { Post } from '../model/post';
import boulderProblemDb from '../repository/boulderProblem.db';
import postDb from '../repository/post.db';
import { PostInput } from '../types';

const getAllPosts = async (): Promise<Post[]> => await postDb.getAllPosts();

const createPost = async ({
    title,
    comment,
    date,
    boulder: boulderInput,
}: PostInput): Promise<Post> => {
    console.log('Test1');
    const newboulder = new BoulderProblem({
        grade: boulderInput.grade,
        gym: new ClimbingGym({
            location: boulderInput.gym.location,
            gymName: boulderInput.gym.gymName,
        }),
    });
    console.log('Test2');

    const boulder = await boulderProblemDb.createBoulderProblem(newboulder);

    const newPost = new Post({ title, comment, date, boulder });
    return await postDb.createPost(newPost);
};

export default { getAllPosts, createPost };
