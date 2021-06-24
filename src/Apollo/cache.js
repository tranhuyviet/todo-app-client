import { InMemoryCache, makeVar } from '@apollo/client';
import jwtDecode from 'jwt-decode';

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                // isLoggedIn: {
                //     read() {
                //         return isLoggedInVar();
                //     },
                // },
                userLoggedIn: {
                    read() {
                        return setUserLoggedIn();
                    },
                },
                cartItems: {
                    read() {
                        return setCartItems();
                    },
                },
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

// is logged in
// export const isLoggedInVar = makeVar(!!localStorage.getItem('todo-app-token'));

// user is logged in
let initialUserLoggedIn = null;
if (localStorage.getItem('todo-app-token')) {
    initialUserLoggedIn = jwtDecode(localStorage.getItem('todo-app-token'));
}
export const setUserLoggedIn = makeVar(initialUserLoggedIn);

export const setCartItems = makeVar([]);
