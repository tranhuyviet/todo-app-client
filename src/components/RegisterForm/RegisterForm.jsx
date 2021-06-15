import React from 'react';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../../utils/validateSchema';

import { useMutation } from '@apollo/client';
import { REGISTER } from '../../Apollo/Graphql/mutations';
import { setUserLoggedIn } from '../../Apollo/cache';

import jwtDecode from 'jwt-decode';

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerSchema),
    });

    const [registerUser, { loading, error: errorMutation }] = useMutation(REGISTER, {
        onError(error) {
            const errorFromServer = error.graphQLErrors[0].extensions.exception.errors;
            console.log('ERROR ON ERROR', errorFromServer);
            Object.assign(errors, errorFromServer);
            console.log(errors);
        },
        onCompleted(result) {
            if (result.register) {
                localStorage.setItem('todo-app-token', result.register.token);
                // isLoggedInVar(true);
                setUserLoggedIn(jwtDecode(result.register.token));
                console.log('DECODE TOKEN', jwtDecode(result.register.token));
            }
        },
    });

    const onSubmit = (inputValues) => {
        console.log(inputValues);
        registerUser({ variables: inputValues });
    };

    // if (errorMutation) return <p>Error mutation</p>;

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
                error={
                    !!errors.email || (errorMutation && !!errorMutation.graphQLErrors[0].extensions.exception.errors)
                }
                helperText={
                    (errors && errors.email && errors.email.message) ||
                    (errorMutation &&
                        errorMutation.graphQLErrors[0].extensions.exception.errors &&
                        errorMutation.graphQLErrors[0].extensions.exception.errors.email)
                }
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
            <br />
            <TextField
                variant="outlined"
                size="small"
                placeholder="Confirm Password"
                type="password"
                name="confirmPassword"
                {...register('confirmPassword')}
                error={!!errors.confirmPassword}
                helperText={errors && errors.confirmPassword && errors.confirmPassword.message}
            />
            <br />
            <Button variant="contained" color="primary" type="submit" disabled={loading}>
                {/* {loading ? <CircularProgress color="inherit" size={24} /> : 'Register'} */}
                {loading && <CircularProgress color="inherit" size={24} />}
                <span style={{ marginRight: 10 }}> </span>
                Register
            </Button>
        </form>
    );
};

export default RegisterForm;
