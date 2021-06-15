import { gql } from '@apollo/client';

export const GET_TODOS = gql`
    query GetTodos($offset: Int, $limit: Int) {
        getTodos(offset: $offset, limit: $limit) {
            total
            hasMore
            todos {
                _id
                title
                status
            }
        }
    }
`;

// export const IS_LOGGED_IN = gql`
//     query IsUserLoggedIn {
//         isLoggedIn @client
//     }
// `;

export const LOGGIN = gql`
    query Login($email: String!, $password: String) {
        login(email: $email, password: $password) {
            _id
            email
            token
        }
    }
`;

export const USER_LOGGED_IN = gql`
    query UserLoggedIn {
        userLoggedIn @client
    }
`;
