import React from 'react';
import { TextField, Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../utils/validateSchema';

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    // console.log('error', errors);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column', width: 500 }}
            noValidate
        >
            <TextField
                variant="outlined"
                size="small"
                placeholder="Email"
                type="email"
                name="email"
                {...register('email')}
                autoFocus
                error={!!errors.email}
                helperText={errors && errors.email && errors.email.message}
            />
            <br />
            <TextField
                variant="outlined"
                size="small"
                placeholder="Password"
                type="password"
                name="password"
                {...register('password')}
                error={!!errors.password}
                helperText={
                    errors && errors.password && errors.password.message
                }
            />
            <br />
            <Button variant="contained" color="primary" type="submit">
                Login
            </Button>
        </form>
    );
};

export default LoginForm;
