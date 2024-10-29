import { User } from '../model/user';
import userDb from '../repository/user.db';

const getAllUsers = (): User[] => userDb.getAllUsers();

const createUser = (user: User): User => {
    const newUser = new User({
        name: user.getName(),
        email: user.getEmail(),
        password: user.getPassword(),
        numPosts: user.getNumposts(),
    });
    return userDb.createUser(newUser);
};

export default { getAllUsers, createUser };
