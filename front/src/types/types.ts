export interface User {
    id: number;
    avatar?: string;
    first_name: string;
    last_name: string;
    email: string;
    emailVerified: boolean;
    dob: string;
    company: Company;
    skills: string[];
}

export interface Company {
    name: string;
    department: string;
}

export interface Page<T> {
    page: number;
    pageSize: number;
    hasNext: boolean;
    data: T[]
}

export interface UserSearchQuery {
    page?: number;
    pageSize?: number;
}

export class ApiError extends Error {
    statusCode: number;
    message: string;

    constructor(
        statusCode: number,
        message: string
    ) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}

export type ErrorType = 'NOT_FOUND' | 'INTERNAL_ERROR'
