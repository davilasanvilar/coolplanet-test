import { ApiError, Page, User } from "../types/types";

interface Api {
    findUsers: (page: number, pageSize: number) => Promise<Page<User>>;
    getUserById: (id: number) => Promise<User>;
}

const API_URL = 'http://localhost:8080';

const findUsers = async (page: number, pageSize: number): Promise<Page<User>> => {
    const response = await fetch(`${API_URL}/users?page=${page}&pageSize=${pageSize}`);
    if (response.ok) {
        return response.json();
    } else {
        throw new ApiError(response.status, 'Error while fetching users');
    }
};

const getUserById = async (id: number): Promise<User> => {
    const response = await fetch(`${API_URL}/users/${id}`);
    if (response.ok) {
        return response.json();
    } else {
        if (response.status === 404) {
            throw new ApiError(response.status, `User with id ${id} not found`);
        }
        throw new ApiError(response.status, 'Error while fetching user');
    }
};

export const api: Api = {
    findUsers,
    getUserById
};