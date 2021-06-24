import React from 'react';
import { AppBar, Button, Toolbar, Typography, IconButton, Badge } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useQuery, useApolloClient, useReactiveVar } from '@apollo/client';
import { USER_LOGGED_IN } from '../../Apollo/Graphql/queries';
import { setUserLoggedIn } from '../../Apollo/cache';

import { setCartItems } from '../../Apollo/cache';

import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

export const Header = () => {
    // const {
    //     data: { isLoggedIn },
    // } = useQuery(IS_LOGGED_IN);
    const client = useApolloClient();
    const cartItems = useReactiveVar(setCartItems);

    console.log('CARTITEMS:', cartItems);
    let total = 0;
    cartItems.forEach((item) => (total += item.quantity));

    console.log('TOTAL', total);
    const {
        data: { userLoggedIn },
    } = useQuery(USER_LOGGED_IN);

    // console.log('User Logged In:', userLoggedIn);

    const logout = () => {
        client.cache.evict({ fieldName: 'userLoggedIn' });
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
                    <>
                        <Typography variant="subtitle1" style={{ marginRight: 10 }}>
                            {userLoggedIn.email}
                        </Typography>
                        <IconButton style={{ marginRight: 4 }} color="inherit">
                            <Badge badgeContent={total} color="secondary" showZero>
                                <ShoppingCartOutlinedIcon />
                            </Badge>
                        </IconButton>
                        <Button color="inherit" onClick={logout}>
                            Logout
                        </Button>
                    </>
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
