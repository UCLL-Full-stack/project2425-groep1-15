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

test('given: invalid name for user, when: user is created, then: error is thrown', () => {
    expect(() => {
        new User({
            name: '',
            email: 'Joren.VanLaer@gmail.com',
            password: 'badPasswrd',
            numPosts: 3,
        });
    }).toThrow('Name cannot be empty.');
});

test('given: invalid email for user, when: user is created, then: error is thrown', () => {
    expect(() => {
        new User({
            name: 'name',
            email: '',
            password: 'badPasswrd',
            numPosts: 3,
        });
    }).toThrow('Invalid email format.');
});

test('given: invalid password for user, when: user is created, then: error is thrown', () => {
    expect(() => {
        new User({
            name: 'name',
            email: 'Joren.VanLaer@gmail.com',
            password: '',
            numPosts: 3,
        });
    }).toThrow('Password cannot be empty.');
});

test('given: invalid posts for user, when: user is created, then: error is thrown', () => {
    expect(() => {
        new User({
            name: 'name',
            email: 'Joren.VanLaer@gmail.com',
            password: 'password',
            numPosts: -3,
        });
    }).toThrow('Number of posts cannot be a negative number.');
});
