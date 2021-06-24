import { gql } from '@apollo/client';

// CART
export const ADD_TO_CART = gql`
    mutation AddToCart($_id: ID!) {
        addToCart(_id: $_id) @client {
            _id
        }
    }
`;

// USER
export const REGISTER = gql`
    mutation Register($email: String!, $password: String!, $confirmPassword: String!) {
        register(email: $email, password: $password, confirmPassword: $confirmPassword) {
            _id
            email
            token
        }
    }
`;

// TODO
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

export const UPDATE_TODO = gql`
    mutation UpdateTodo($_id: ID!, $title: String, $status: Boolean) {
        updateTodo(_id: $_id, title: $title, status: $status) {
            _id
            title
            status
        }
    }
`;
