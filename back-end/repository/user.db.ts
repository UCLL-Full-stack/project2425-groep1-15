import { User } from '../model/user';
import { set } from 'date-fns';

const start = set(new Date(), { hours: 8, minutes: 30 });

const users = [
    new User({
        name: 'Joren',
        email: 'Joren.VanLaer@gmail.com',
        password: 'badPasswrd',
        numPosts: 3,
    }),
    new User({
        name: 'Nathan',
        email: 'Nathan.DeKlerck@gmail.com',
        password: 'badPasswrd',
        numPosts: 5,
    }),
];

const getAllUsers = (): User[] => users;

const createUser = (user: User): User => {
    users.push(user);
    return user;
};

const getUserByEmail = (email: string): User | null => {
    return users.find((user) => user.getEmail() === email) || null;
};

export default {
    getAllUsers,
    createUser,
    getUserByEmail,
};
