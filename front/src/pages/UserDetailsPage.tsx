import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { ApiError, ErrorType, User } from '../types/types';
import { api } from '../api/api';
import { UserCard } from '../components/usercard/UserCard';
import { Header } from '../components/Header';
import { ErrorIndicator } from '../components/ErrorIndicator';
import { assign, fromPromise, setup } from 'xstate';
import { useMachine } from '@xstate/react';


interface FetchUserContext {
    user: User | undefined;
    error: ErrorType | undefined;
    userId: number | undefined;
}

const fetchUser = async (userId: number | undefined) => {
    await new Promise((resolve) => setTimeout(() => {
        resolve('')
    }, 500)
    )
    console.log('fetching user', userId)
    if (userId) {
        const user = await api.getUserById(userId);
        return user;
    }
}

const fetchUserMachine = setup({
    types: {
        context: {} as FetchUserContext
    },
    actors: {
        fetchUser: fromPromise<User | undefined, { userId: number | undefined }>(async (input) => {
            return await fetchUser(input.input.userId);
        })
    }
}).createMachine({
    id: 'fetchUserMachine',
    initial: 'idle',
    context: {
        user: undefined,
        error: undefined,
        userId: undefined
    },

    states: {
        idle: {},
        loading: {
            invoke: {
                id: 'getUsers',
                src: 'fetchUser',
                input: (context) => ({
                    userId: context.context.userId
                }),
                onDone: {
                    actions: [
                        assign({ user: ({ event }) => event.output }),
                    ],
                    target: 'success'
                },
                onError: {
                    actions: [
                        assign({
                            error: ({ event }) => {
                                console.log(event.error);
                                if (event.error instanceof ApiError) {
                                    return event.error.statusCode === 404 ? 'NOT_FOUND' : 'INTERNAL_ERROR'
                                } else {
                                    return 'INTERNAL_ERROR'
                                }
                            }
                        }),
                    ],
                    target: 'error',
                }
            }
        },
        error: {
        },
        success: {
        },
    },
    on: {
        FETCH: {
            target: '.loading',
            actions: assign({ userId: ({ event }) => event.input.userId })
        }

    }
});

export function UserDetailsPage() {
    const { id } = useParams<{ id: string }>();

    const [fetchState, send] = useMachine(fetchUserMachine);

    useEffect(() => {
        if (id) {
            send({ type: 'FETCH', input: { userId: parseInt(id) } });
        }
    }, [id]);


    return (
        <>
            <Header title="User info" backPath='/' />
            <main>
                {fetchState.matches('loading') ?
                    <LoadingIndicator />
                    :
                    fetchState.matches('error') ?
                        <ErrorIndicator type={fetchState.context.error!} />
                        :
                        fetchState.context.user && <UserCard user={fetchState.context.user} />
                }
            </main>
        </>
    )
}