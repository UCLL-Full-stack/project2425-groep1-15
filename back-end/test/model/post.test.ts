import { set } from 'date-fns';
import { Post } from '../../model/post';

const date = set(new Date(), { hours: 8, minutes: 30 });

test('given: valid values for post, when: post is created, then: post is created with those values', () => {
    const post = new Post({
        title: 'first v5 ever!',
        comment: 'this is my first V5 ever! I am so proud of myself',
        date: date,
    });

    expect(post.getTitle()).toEqual('first v5 ever!');
    expect(post.getComment()).toEqual('this is my first V5 ever! I am so proud of myself');
    expect(post.getDate()).toEqual(date);
});
