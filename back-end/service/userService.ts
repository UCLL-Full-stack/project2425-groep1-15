import { User } from '../model/user';
import userDb from '../repository/user.db';

const getAllUsers = (): User[] => userDb.getAllUsers();

const createuser = (user: User): void => userDb.createUser(user);

export default { getAllUsers };
