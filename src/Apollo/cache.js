import { InMemoryCache } from '@apollo/client';

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                getTodos: {
                    keyArgs: false,
                    merge(existing, incoming) {
                        console.log('existing: ', existing);
                        console.log('incoming: ', incoming);

                        let todos = [];
                        if (existing && existing.todos) {
                            todos = todos.concat(existing.todos);
                        }
                        if (incoming && incoming.todos) {
                            todos = todos.concat(incoming.todos);
                        }

                        return {
                            ...incoming,
                            todos,
                        };
                    },
                },
            },
        },
    },
});
