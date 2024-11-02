import { set } from 'date-fns';
import { User } from '../../model/user';
import userDb from '../../repository/user.db';
import userService from '../../service/userService';

let createUserMock: jest.Mock;

let mockUserDbCreateUser: jest.SpyInstance<User, [User], any>;

beforeEach(() => {
    mockUserDbCreateUser = jest.spyOn(userDb, 'createUser');
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given a valid user, when schedule is user, then user is created with those values', () => {
    const newUser = new User({ name: 'f', email: 'e@a.c', password: 'lol', numPosts: 2 });

    userService.createUser(newUser);

    expect(mockUserDbCreateUser).toHaveBeenCalledTimes(1);
    expect(mockUserDbCreateUser).toHaveBeenCalledWith(
        new User({ name: 'f', email: 'e@a.c', password: 'lol', numPosts: 2 })
    );
});

test('given a user with existing email, when createUser is called, then an error is thrown', () => {
    const user1 = new User({
        name: 'user1',
        email: 'user@gmail.com',
        password: '123',
        numPosts: 1,
    });
    const user2 = new User({
        name: 'user2',
        email: 'user@gmail.com',
        password: '123',
        numPosts: 1,
    });

    expect(() => {
        userService.createUser(user1);
        userService.createUser(user2);
    }).toThrowError(`User with this email already exists.`);

    expect(mockUserDbCreateUser).toHaveBeenCalledTimes(1);
});
