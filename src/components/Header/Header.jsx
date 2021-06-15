import React from 'react';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useQuery, useApolloClient } from '@apollo/client';
import { IS_LOGGED_IN, USER_LOGGED_IN } from '../../Apollo/Graphql/queries';
import { setUserLoggedIn } from '../../Apollo/cache';

export const Header = () => {
    // const {
    //     data: { isLoggedIn },
    // } = useQuery(IS_LOGGED_IN);
    const client = useApolloClient();
    const {
        data: { userLoggedIn },
    } = useQuery(USER_LOGGED_IN);

    console.log('UserLoggedIn', userLoggedIn);

    const logout = () => {
        client.cache.evict({ fieldName: 'me' });
        client.cache.gc();
        localStorage.removeItem('todo-app-token');
        setUserLoggedIn(null);
    };

    return (
        <AppBar>
            <Toolbar>
                <Typography
                    variant="h6"
                    color="inherit"
                    style={{
                        fontWeight: 'bold',
                        flexGrow: 1,
                        textDecoration: 'none',
                    }}
                    component={Link}
                    to="/"
                >
                    Todo App
                </Typography>
                {userLoggedIn ? (
                    <Button color="inherit" onClick={logout}>
                        Logout
                    </Button>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/login">
                            Login
                        </Button>
                        <Button color="inherit" component={Link} to="/register">
                            Register
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};
