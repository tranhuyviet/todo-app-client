import { gql } from '@apollo/client';

export const FRAGMENT_TODO = gql`
    fragment FragmentTodo on Todo {
        _id
        title
        status
    }
`;

export const FRAGMEMT_RETURN_USER = gql`
    fragment FragmentReturnUser on User {
        _id
        email
        token
    }
`;
