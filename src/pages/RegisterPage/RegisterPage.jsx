import React from 'react';
import { Typography } from '@material-ui/core';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

const RegisterPage = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                REGISTER
            </Typography>
            <br />
            <RegisterForm />
        </div>
    );
};

export default RegisterPage;
