import { set } from 'date-fns';
import { Post } from '../../model/post';
import postDb from '../../repository/post.db';
import postService from '../../service/postService';
import { BoulderProblem } from '../../model/boulderProblem';
import climbingGymDb from '../../repository/climbingGym.db';
import { ClimbingGym } from '../../model/climbingGym';

let createPostMock: jest.Mock;

let mockPostDbCreatePost: jest.SpyInstance<Promise<Post>, [Post], any>;

beforeEach(() => {
    mockPostDbCreatePost = jest.spyOn(postDb, 'createPost');
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given a valid post, when post gets created, then post is created with those values', () => {
    const date1 = set(new Date(), { hours: 0, minutes: 0 });
    const gym1 = new ClimbingGym({ location: 'Herent', gymName: 'Boulder One' });
    const boulder1 = new BoulderProblem({ grade: 'V5', gym: gym1 });

    postService.createPost({
        title: 'f',
        comment: 'e',
        date: date1,
        boulder: boulder1,
    });

    expect(mockPostDbCreatePost).toHaveBeenCalledTimes(1);
    expect(mockPostDbCreatePost).toHaveBeenCalledWith(
        new Post({ title: 'f', comment: 'e', date: date1, boulder: boulder1 })
    );
});
