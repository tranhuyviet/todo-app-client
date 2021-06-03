import { gql } from '@apollo/client';

export const DELETE_TODO = gql`
    mutation deleteTodo($_id: ID!) {
        deleteTodo(_id: $_id)
    }
`;

export const ADD_TOTO = gql`
    mutation addTodo($title: String!) {
        addTodo(title: $title) {
            _id
            title
            status
        }
    }
`;
