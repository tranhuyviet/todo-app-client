import { ApolloClient, ApolloProvider, createHttpLink } from '@apollo/client';
import App from '../App';
import { cache } from './cache';

const httpLink = createHttpLink({
    uri: 'http://localhost:5000/graphql',
});

const client = new ApolloClient({
    link: httpLink,
    cache,
});

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);
