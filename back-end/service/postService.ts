import { BoulderProblem } from '../model/boulderProblem';
import { Post } from '../model/post';
import postDb from '../repository/post.db';

const getAllPosts = async (): Promise<Post[]> => await postDb.getAllPosts();

const createPost = async (postData: {
    title: string;
    comment: string;
    date: Date;
    boulder: BoulderProblem;
}): Promise<Post> => {
    const newPost = new Post(postData);
    return await postDb.createPost(newPost);
};

export default { getAllPosts, createPost };
