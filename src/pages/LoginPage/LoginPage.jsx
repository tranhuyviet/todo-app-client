import { Typography } from '@material-ui/core';
import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';

const LoginPage = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                LOGIN
            </Typography>
            <br />
            <LoginForm />
        </div>
    );
};

export default LoginPage;
