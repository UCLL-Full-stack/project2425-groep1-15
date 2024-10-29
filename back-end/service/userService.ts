import { User } from '../model/user';
import userDb from '../repository/user.db';

const getAllUsers = (): User[] => userDb.getAllUsers();

const createUser = (user: User): User => {
    if (userDb.getUserByEmail(user.getEmail()) != null) {
        throw new Error(`User with this email already exists.`);
    }
    const newUser = new User({
        name: user.getName(),
        email: user.getEmail(),
        password: user.getPassword(),
        numPosts: user.getNumposts(),
    });
    return userDb.createUser(newUser);
};

export default { getAllUsers, createUser };
