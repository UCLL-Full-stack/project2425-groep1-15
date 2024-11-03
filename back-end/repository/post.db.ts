import { BoulderProblem } from '../model/boulderProblem';
import { ClimbingGym } from '../model/climbingGym';
import { Post } from '../model/post';
import { set } from 'date-fns';

const date1 = set(new Date(), { hours: 0, minutes: 0 });

const climbingGyms = [
    new ClimbingGym({
        location: 'Herent',
        gymName: 'Boulder One',
    }),
    new ClimbingGym({
        location: 'Leuven',
        gymName: 'Monkeys',
    }),
];

const boulderProblems = [
    new BoulderProblem({
        grade: 'V5',
        gym: climbingGyms[0],
    }),
    new BoulderProblem({
        grade: 'V7',
        gym: climbingGyms[1],
    }),
];

const posts = [
    new Post({
        title: 'first V5',
        comment: 'this is the first V5 I have ever done',
        date: date1,
        boulder: boulderProblems[0],
    }),
    new Post({
        title: 'first boulder ever',
        comment: 'this is the first boulder problem I have ever done',
        date: date1,
        boulder: boulderProblems[1],
    }),
];

const getAllposts = (): Post[] => posts;

const createPost = (post: Post): Post => {
    const newPost = new Post({
        title: post.getTitle(),
        comment: post.getComment(),
        date: post.getDate(),
        boulder: post.getBoulder(),
    });
    posts.push(newPost);
    return newPost;
};

export default {
    getAllposts,
    createPost,
};
