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
