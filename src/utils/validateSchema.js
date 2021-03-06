import * as yup from 'yup';

const email = yup
    .string()
    .email('Invalid email format')
    .required('Please enter your email');
const password = yup
    .string()
    .min(6, 'Password must me at least 6 characters')
    .required('Please enter your password');
const confirmPassword = yup
    .string()
    .oneOf([yup.ref('password')], 'Password not match');

export const loginSchema = yup.object({
    email,
    password,
});

export const registerSchema = yup.object({
    email,
    password,
    confirmPassword,
});
