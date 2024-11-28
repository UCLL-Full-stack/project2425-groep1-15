import { User } from '../model/user';
import userDb from '../repository/user.db';

const getAllUsers = async (): Promise<User[]> => userDb.getAllUsers();

const createUser = async (user: User): Promise<User> => {
    if (userDb.getUserByEmail(user.getEmail()) != null) {
        throw new Error(`User with this email already exists.`);
    }
    const newUser = new User({
        name: user.getName(),
        email: user.getEmail(),
        password: user.getPassword(),
        numPosts: user.getNumposts(),
    });
    return await userDb.createUser(newUser);
};

export default { getAllUsers, createUser };
