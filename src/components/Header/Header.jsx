import React from 'react';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

export const Header = () => {
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
                <Button color="inherit" component={Link} to="/login">
                    Login
                </Button>
            </Toolbar>
        </AppBar>
    );
};
