import { Post } from '../model/post';
import postDb from '../repository/post.db';

const getAllPosts = (): Post[] => postDb.getAllposts();

const createPost = (postData: { title: string; comment: string; date: Date }): Post => {
    const newPost = new Post(postData); // Create a Post instance, which will validate the data
    return postDb.createPost(newPost); // Pass the valid Post instance to the repository
};

export default { getAllPosts, createPost };
