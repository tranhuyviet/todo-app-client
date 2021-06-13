import * as yup from 'yup';

const email = yup
    .string()
    .email('Invalid email format')
    .required('Please enter your email');
const password = yup
    .string()
    .min(6, 'Password must me at least 6 characters')
    .required('Please enter your password');

export const loginSchema = yup.object({
    email,
    password,
});
