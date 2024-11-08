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