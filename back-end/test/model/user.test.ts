import { set } from 'date-fns';
import { User } from '../../model/user';

const start = set(new Date(), { hours: 0, minutes: 0 });

test('given: valid values for user, when: user is created, then: user is created with those values', () => {
    const user = new User({
        name: 'Joren',
        email: 'Joren.VanLaer@gmail.com',
        password: 'badPasswrd',
        startdate: start,
        numPosts: 3,
    });

    expect(user.getName()).toEqual('Joren');
    expect(user.getEmail()).toEqual('Joren.VanLaer@gmail.com');
    expect(user.getPassword()).toEqual('badPasswrd');
    expect(user.getStartdate()).toEqual(start);
    expect(user.getNumposts()).toEqual(3);
});
