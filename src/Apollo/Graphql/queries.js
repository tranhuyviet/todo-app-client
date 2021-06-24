import { gql } from '@apollo/client';
import { FRAGMENT_TODO, FRAGMEMT_RETURN_USER } from './fragments';

export const GET_TODOS = gql`
    query GetTodos($offset: Int, $limit: Int) {
        getTodos(offset: $offset, limit: $limit) {
            total
            hasMore
            todos {
                # _id
                # title
                # status
                ...FragmentTodo
            }
        }
    }
    ${FRAGMENT_TODO}
`;

export const GET_TODO = gql`
    query GetTodo($_id: ID!) {
        getTodo(_id: $_id) {
            ...FragmentTodo
        }
    }
    ${FRAGMENT_TODO}
`;

// export const IS_LOGGED_IN = gql`
//     query IsUserLoggedIn {
//         isLoggedIn @client
//     }
// `;

export const LOGGIN = gql`
    query Login($email: String!, $password: String) {
        login(email: $email, password: $password) {
            # _id
            # email
            # token
            ...FragmentReturnUser
        }
    }
    ${FRAGMEMT_RETURN_USER}
`;

export const USER_LOGGED_IN = gql`
    query UserLoggedIn {
        userLoggedIn @client
    }
`;
