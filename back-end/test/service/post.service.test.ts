import { set } from 'date-fns';
import { Post } from '../../model/post';
import postDb from '../../repository/post.db';
import postService from '../../service/postService';

let createPostMock: jest.Mock;

let mockPostDbCreatePost: jest.SpyInstance<Post, [Post], any>;

beforeEach(() => {
    mockPostDbCreatePost = jest.spyOn(postDb, 'createPost');
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given a valid post, when schedule is post, then post is created with those values', () => {
    const date1 = set(new Date(), { hours: 0, minutes: 0 });

    postService.createPost({
        title: 'f',
        comment: 'e',
        date: date1,
    });

    expect(mockPostDbCreatePost).toHaveBeenCalledTimes(1);
    expect(mockPostDbCreatePost).toHaveBeenCalledWith(
        new Post({ title: 'f', comment: 'e', date: date1 })
    );
});
