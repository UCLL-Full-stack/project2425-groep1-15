import { User } from '../model/user';
import userDb from '../repository/user.db';
import bcrypt from 'bcrypt';
import { AuthenticationResponse, UserInput } from '../types';
import { generateJwtToken } from '../util/jwt';

const getAllUsers = async (): Promise<User[]> => userDb.getAllUsers();

const getUserByEmail = async (email: string): Promise<User | null> => {
    const user = await userDb.getUserByEmail(email.trim().toLowerCase());
    if (!user) throw new Error(`User with email ${email} does not exist.`);
    return user;
};

const createUser = async (user: User): Promise<User> => {
    if (userDb.getUserByEmail(user.getEmail()) != null) {
        throw new Error(`User with this email already exists.`);
    }
    const hashedPassword = await bcrypt.hash(user.getPassword(), 12);

    const newUser = new User({
        name: user.getName(),
        email: user.getEmail().trim().toLowerCase(),
        password: hashedPassword,
        achievements: user.getAchievements(),
    });

    return await userDb.createUser(newUser);
};

const authenticate = async ({ email, password }: UserInput): Promise<AuthenticationResponse> => {
    const newEmail = email.trim().toLowerCase();
    const user = await userDb.getUserByEmail(newEmail);

    if (!user) {
        throw new Error('no user with that email');
    }

    const isValidPassword = await bcrypt.compare(password, user.getPassword());

    if (!isValidPassword) {
        throw new Error('Incorrect password.');
    }
    return {
        token: generateJwtToken({ email, role: user.getRole() }),
        email: email,
        role: user.getRole(),
    };
};
export default { getAllUsers, createUser, authenticate, getUserByEmail };
