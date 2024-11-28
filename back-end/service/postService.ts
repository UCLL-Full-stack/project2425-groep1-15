import { BoulderProblem } from '../model/boulderProblem';
import { Post } from '../model/post';
import boulderProblemDb from '../repository/boulderProblem.db';
import postDb from '../repository/post.db';

const getAllPosts = async (): Promise<Post[]> => await postDb.getAllPosts();

const createPost = async (postData: {
    title: string;
    comment: string;
    date: Date;
    boulder: BoulderProblem;
}): Promise<Post> => {
    const newBoulder = boulderProblemDb.createBoulderProblem(postData.boulder);

    const newPost = new Post(postData);

    return await postDb.createPost(newPost);
};

export default { getAllPosts, createPost };
