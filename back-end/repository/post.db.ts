import { Post } from '../model/post';
import { set } from 'date-fns';

const date1 = set(new Date(), { hours: 0, minutes: 0 });

const posts = [
    new Post({
        title: 'first V5',
        comment: 'this is the first V5 i have ever done',
        date: date1,
    }),
];

const getAllposts = (): Post[] => posts;

export default {
    getAllposts,
};
