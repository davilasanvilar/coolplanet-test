import React, { useEffect, useRef, useState } from 'react';
import { ErrorType, User } from '../types/types';
import { api } from '../api/api';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { Pagination } from '../components/Pagination';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { ErrorIndicator } from '../components/ErrorIndicator';

export function HomePage() {

    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [error, setError] = useState<ErrorType | undefined>(undefined);

    const firstRender = useRef(true)
    const navigate = useNavigate()


    const [isLoading, setIsLoading] = useState<boolean>(false)

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const usersPage = await api.findUsers(page, pageSize);
            await new Promise((resolve) => setTimeout(() => {
                resolve('')
            }, 500)
            )
            setUsers(usersPage.data);
            setHasNextPage(usersPage.hasNext);
        } catch (error) {
            setError('INTERNAL_ERROR');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [page])

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        setPage(1);
        fetchUsers();
    }, [pageSize])



    return (
        <>
            <Header title='Users' />
            <main>
                <table>
                    <thead>
                        <tr>
                            <th>{"First name"}</th>
                            <th>{"Last name"}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ?
                            <tr>
                                <td colSpan={2}><LoadingIndicator /></td>
                            </tr> :
                            error ?
                                <tr>
                                    <td colSpan={2}> <ErrorIndicator type={error} />
                                    </td>
                                </tr>
                                :
                                users.map((user) =>
                                    <tr className='selectable-row' key={user.id} onClick={() => navigate(`/users/${user.id}`)}>
                                        <td>{user.first_name}</td>
                                        <td>{user.last_name}</td>
                                    </tr>
                                )}
                    </tbody>
                </table>
                <Pagination page={page} setPage={setPage} pageSize={pageSize} setPageSize={setPageSize} hasNextPage={hasNextPage} isLoading={isLoading} />
            </main>
        </>
    )
}