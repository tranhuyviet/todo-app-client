import { ApolloClient, ApolloProvider, createHttpLink, gql } from '@apollo/client';
import App from '../App';
import { cache } from './cache';
import typeDefs from './Graphql/typeDefs';

const httpLink = createHttpLink({
    uri: 'http://localhost:5000/graphql',
});

const client = new ApolloClient({
    link: httpLink,
    cache,
    typeDefs,
});

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);
