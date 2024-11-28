import { set } from 'date-fns';
import { Post } from '../../model/post';
import { BoulderProblem } from '../../model/boulderProblem';
import { ClimbingGym } from '../../model/climbingGym';

const date = set(new Date(), { hours: 8, minutes: 30 });
const gym1 = new ClimbingGym({ location: 'Herent', gymName: 'Boulder One' });
const boulder1 = new BoulderProblem({ grade: 'V5', gym: gym1 });

test('given: valid values for post, when: post is created, then: post is created with those values', () => {
    const post = new Post({
        title: 'first v5 ever!',
        comment: 'this is my first V5 ever! I am so proud of myself',
        date: date,
        boulder: boulder1,
    });

    expect(post.getTitle()).toEqual('first v5 ever!');
    expect(post.getComment()).toEqual('this is my first V5 ever! I am so proud of myself');
    expect(post.getDate()).toEqual(date);
});

test('given: invalid title for Post, when: Post is created, then: error is thrown', () => {
    expect(() => {
        new Post({
            title: '',
            comment: 'this is my first V5 ever! I am so proud of myself',
            date: date,
            boulder: boulder1,
        });
    }).toThrow('Title cannot be empty.');
});

test('given: invalid Comment for Post, when: Post is created, then: error is thrown', () => {
    expect(() => {
        new Post({
            title: 'title',
            comment: '',
            date: date,
            boulder: boulder1,
        });
    }).toThrow('Comment cannot be empty.');
});
