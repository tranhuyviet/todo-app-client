import { gql } from '@apollo/client';

export default gql`
    extend type Query {
        isLoggedIn: Boolean!
    }

    extend type ReturnTodos {
        user: User
    }
`;
