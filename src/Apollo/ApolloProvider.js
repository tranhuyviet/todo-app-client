import {ApolloClient, ApolloProvider, InMemoryCache, createHttpLink} from '@apollo/client'
import App from '../App'

const httpLink = createHttpLink({
    uri: 'http://localhost:5000/graphql'
})

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})

export default (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)