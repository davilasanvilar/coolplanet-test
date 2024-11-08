import users from '../data/users.json' assert {type: 'json'};
import { Page, User } from './types/types.js';

interface UserService {
    findUsers(page?: number, pageSize?: number): Page<User>;
    getUserById(id: number): User | undefined;
}

const findUsers = (page?: number, pageSize?: number): Page<User> => {
    const nPage = page || 1;
    const size = pageSize || 10;
    const pageUsers = users.slice((nPage - 1) * size, nPage * size);

    return {
        data: pageUsers,
        page: nPage,
        pageSize: size,
        hasNext: nPage * size < users.length
    }
}

const getUserById = (id: number): User | undefined => {
    const user = users.find(user => user.id === id);
    return user;
}

export const userService: UserService = {
    findUsers,
    getUserById
}
