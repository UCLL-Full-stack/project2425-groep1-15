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
import { User } from '../model/user';

const getAllPosts = async (): Promise<Post[]> => await postDb.getAllPosts();

const getPostById = async (id: number): Promise<Post> => {
    const post = await postDb.getPostById({ id });
    if (!post) throw new Error(`Post with id ${id} does not exist.`);
    return post;
};

const getPostsByUser = async (user: User): Promise<Post[]> => {
    const test = await userDb.getUserByEmail(user.getEmail());

    if (!test) {
        throw new Error('no user like that found');
    }
    const posts = await postDb.getPostsByUser({ user });
    return posts;
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

const editPost = async (
    { title, comment, date, boulder: boulderInput, image: imageInput, user: userInput }: PostInput,
    id: number
): Promise<Post> => {
    const oldPost = await getPostById(id);
    const newTitle = title || oldPost.getTitle();
    const newComment = comment || oldPost.getComment();
    const newDate = date || oldPost.getDate();

    const newImage = imageInput
        ? new Image({
              fileName: imageInput.fileName || oldPost.getImage().getFileName(),
              path: imageInput.path || oldPost.getImage().getPath(),
          })
        : oldPost.getImage();

    const userEmail = userInput?.email || oldPost.getUser().getEmail();
    const user = await userDb.getUserByEmail(userEmail);
    if (!user) {
        throw new Error(`User with email ${userEmail} does not exist`);
    }

    const boulderId = oldPost.getBoulder().getId();
    if (!boulderId) {
        throw new Error(`boulder must exist`);
    }
    const boulder = await boulderProblemDb.getBoulderById(boulderId);
    if (!boulder) {
        throw new Error(`boulder must exist`);
    }

    const image = await imageDb.createImage(newImage);

    const newPost = new Post({
        id: oldPost.getId(),
        title: newTitle,
        comment: newComment,
        date: newDate,
        boulder,
        image,
        user,
    });
    return await postDb.updatePost(id, newPost);
};

const deletePostById = async (id: number) => {
    const test = await postDb.getPostById({ id });

    if (!test) {
        throw new Error('no post with that id exists');
    }
    await postDb.deletePostById(id);
};

export default { getAllPosts, createPost, getPostById, editPost, getPostsByUser, deletePostById };
