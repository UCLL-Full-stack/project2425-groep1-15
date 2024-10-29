import { User } from '../model/user';
import { set } from 'date-fns';

const start = set(new Date(), { hours: 8, minutes: 30 });

const users = [
    new User({
        name: 'Joren',
        email: 'Joren.VanLaer@gmail.com',
        password: 'badPasswrd',
        startdate: start,
        numPosts: 3,
    }),
    new User({
        name: 'Nathan',
        email: 'Nathan.DeKlerck@gmail.com',
        password: 'badPasswrd',
        startdate: start,
        numPosts: 5,
    }),
];

const getAllUsers = (): User[] => users;

const createUser = (user: User): void => {
    const newUser = new User({
        name: user.getName(),
        email: user.getEmail(),
        password: user.getPassword(),
        startdate: user.getStartdate(),
        numPosts: user.getNumposts(),
    });
    users.push(newUser);
};

export default {
    getAllUsers,
    createUser,
};
