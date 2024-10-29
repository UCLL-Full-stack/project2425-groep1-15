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
    userService.createUser({});

    expect(mockUserDbCreateUser).toHaveBeenCalledTimes(1);
    expect(mockUserDbCreateUser).toHaveBeenCalledWith(
        new User({ name: 'f', email: 'e@a.c', password: 'lol', numPosts: 2 })
    );
});
