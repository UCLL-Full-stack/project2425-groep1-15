import { Post } from '../model/post';
import postDb from '../repository/post.db';

const getAllPosts = (): Post[] => postDb.getAllposts();

const createPost = (postData: { title: string; comment: string; date: Date }): Post => {
    const newPost = new Post(postData);
    return postDb.createPost(newPost);
};

export default { getAllPosts, createPost };
