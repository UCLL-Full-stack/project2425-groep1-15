import { User } from '../../model/user';

test('given: valid values for user, when: user is created, then: user is created with those values', () => {
    const user = new User({
        name: 'Joren',
        email: 'Joren.VanLaer@gmail.com',
        password: 'badPasswrd',
        numPosts: 3,
    });

    expect(user.getName()).toEqual('Joren');
    expect(user.getEmail()).toEqual('Joren.VanLaer@gmail.com');
    expect(user.getPassword()).toEqual('badPasswrd');
    expect(user.getNumposts()).toEqual(3);
});
