import { ErrorType, Page, User } from '../types/types';
import { api } from '../api/api';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { Pagination } from '../components/Pagination';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { ErrorIndicator } from '../components/ErrorIndicator';
import { assign, fromPromise, setup } from 'xstate';
import { useMachine } from '@xstate/react';



const fetchUsers = async (page: number, pageSize: number): Promise<Page<User>> => {
    try {
        const usersPage = await api.findUsers(page, pageSize);
        await new Promise((resolve) => setTimeout(() => {
            resolve('')
        }, 500)
        )
        return usersPage;
    } catch (error) {
        throw error;
    }
}

interface FetchUsersContext {
    users: User[];
    error: ErrorType | undefined;
    page: number;
    pageSize: number;
    hasNextPage: boolean;
}

const fetchUsersMachine = setup({
    types: {
        context: {} as FetchUsersContext
    },
    actors: {
        fetchUsers: fromPromise<Page<User>, { page: number, pageSize: number }>(async ({input}) => {
            return await fetchUsers(input.page, input.pageSize);
        })
    }
}).createMachine({
    id: 'fetchUsers',
    initial: 'loading',
    context: {
        users: [],
        error: undefined,
        page: 1,
        pageSize: 10,
        hasNextPage: false,
    },

    states: {
        loading: {
            invoke: {
                id: 'getUsers',
                src: 'fetchUsers',
                input: ({context}) => ({
                    page: context.page,
                    pageSize: context.pageSize
                }),
                onDone: {
                    actions: [
                        assign({ users: ({ event }) => event.output.data }),
                        assign({ hasNextPage: ({ event }) => event.output.hasNext }),
                    ],
                    target: 'success'
                },
                onError: {
                    actions: [
                        assign({ error: 'INTERNAL_ERROR' }),
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
        FETCH: '.loading',
        SET_PAGE: {
            actions: assign({ page: ({ event }) => event.page }),
            target: '.loading'
        },
        SET_PAGE_SIZE: {
            actions: assign({ pageSize: ({ event }) => event.pageSize, page: 1 }),
            target: '.loading'
        }
    }
});

export function HomePage() {


    const navigate = useNavigate()

    const [fetchState, send] = useMachine(fetchUsersMachine);

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
                        {fetchState.matches('loading') ?
                            <tr>
                                <td colSpan={2}><LoadingIndicator /></td>
                            </tr> :
                            fetchState.matches('error') ?
                                <tr>
                                    <td colSpan={2}> <ErrorIndicator type={fetchState.context.error!} />
                                    </td>
                                </tr>
                                :
                                fetchState.context.users.map((user) =>
                                    <tr className='selectable-row' key={user.id} onClick={() => navigate(`/users/${user.id}`)}>
                                        <td>{user.first_name}</td>
                                        <td>{user.last_name}</td>
                                    </tr>
                                )}
                    </tbody>
                </table>
                <Pagination page={fetchState.context.page}
                    setPage={(page: number) => send({ type: 'SET_PAGE', page })}
                    pageSize={fetchState.context.pageSize}
                    setPageSize={(pageSize: number) =>
                        send({ type: 'SET_PAGE_SIZE', pageSize })}
                    hasNextPage={fetchState.context.hasNextPage}
                    isLoading={fetchState.matches('loading')} />
            </main>
        </>
    )
}