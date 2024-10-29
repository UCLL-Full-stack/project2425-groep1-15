import { Post } from '../model/post';
import { set } from 'date-fns';

const date1 = set(new Date(), { hours: 0, minutes: 0 });

const posts = [
    new Post({
        title: 'first V5',
        comment: 'this is the first V5 i have ever done',
        date: date1,
    }),
    new Post({
        title: 'first boulder ever',
        comment: 'this is the first boulder problem i have ever done',
        date: date1,
    }),
];

const getAllposts = (): Post[] => posts;

const createPost = (post: Post): Post => {
    const newPost = new Post({
        title: post.getTitle(),
        comment: post.getComment(),
        date: post.getDate(),
    });
    posts.push(newPost);
    return newPost;
};

export default {
    getAllposts,
    createPost,
};
