import React from 'react';
import { TextField, Button, CircularProgress, Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../utils/validateSchema';
import { LOGGIN } from '../../Apollo/Graphql/queries';
import { useLazyQuery } from '@apollo/client';

import jwtDecode from 'jwt-decode';
import { setUserLoggedIn } from '../../Apollo/cache';

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const [loginQuery, { loading }] = useLazyQuery(LOGGIN, {
        onError(error) {
            const errorFromServer = error.graphQLErrors[0].extensions.exception.errors;
            console.log('ERROR ON ERROR', errorFromServer);
            Object.assign(errors, errorFromServer);
            console.log(errors);
        },
        onCompleted(result) {
            console.log('RESULT LOGIN', result);
            // if login success
            if (result.login) {
                localStorage.setItem('todo-app-token', result.login.token);
                // isLoggedInVar(true);
                setUserLoggedIn(jwtDecode(result.login.token));
            }
        },
    });

    const onSubmit = (dataInput) => {
        loginQuery({ variables: dataInput });
    };

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
                helperText={errors && errors.password && errors.password.message}
            />
            {errors.global && (
                <>
                    <br />
                    <Typography variant="body1" color="secondary">
                        {errors.global}
                    </Typography>
                </>
            )}
            <br />
            <Button variant="contained" color="primary" type="submit" disabled={loading}>
                {loading && <CircularProgress color="inherit" size={24} />}
                <span style={{ marginRight: 10 }}> </span>
                Login
            </Button>
        </form>
    );
};

export default LoginForm;
