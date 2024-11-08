import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { ApiError, ErrorType, User } from '../types/types';
import { api } from '../api/api';
import { UserCard } from '../components/usercard/UserCard';
import { Header } from '../components/Header';
import { ErrorIndicator } from '../components/ErrorIndicator';

export function UserDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<User | undefined>(undefined)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<ErrorType | undefined>(undefined)

    const navigate = useNavigate()

    const fetchUser = async () => {
        setIsLoading(true);
        try {
            await new Promise((resolve) => setTimeout(() => {
                resolve('')
            }, 500)
            )
            if (id) {
                const user = await api.getUserById(Number.parseInt(id));
                setUser(user);
            }
        } catch (error) {
            if (error instanceof ApiError) {
                if (error.statusCode === 404) {
                    setError('NOT_FOUND')
                }
            } else {
                setError('INTERNAL_ERROR')
            }
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])




    return (
        <>
            <Header title="User info" backPath='/' />
            <main>
                {isLoading ?
                    <LoadingIndicator />
                    :
                    error ?
                        <ErrorIndicator type={error} />
                        :
                        <UserCard user={user!} />
                }
            </main>
        </>
    )
}