import { User } from '../model/user';
import userDb from '../repository/user.db';
import bcrypt from 'bcrypt';

const getAllUsers = async (): Promise<User[]> => userDb.getAllUsers();

const createUser = async (user: User): Promise<User> => {
    if (userDb.getUserByEmail(user.getEmail()) != null) {
        throw new Error(`User with this email already exists.`);
    }
    const hashedPassword = await bcrypt.hash(user.getPassword(), 12);

    const newUser = new User({
        name: user.getName(),
        email: user.getEmail(),
        password: hashedPassword,
        numPosts: user.getNumposts(),
    });

    return await userDb.createUser(newUser);
};

export default { getAllUsers, createUser };
