import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { USER_LOGGED_IN } from '../../Apollo/Graphql/queries';

const AuthRoute = (props) => {
    const {
        data: { userLoggedIn },
    } = useQuery(USER_LOGGED_IN);
    console.log(userLoggedIn);
    if (props.auth && !userLoggedIn) {
        return <Redirect to="/login" />;
    } else if (props.notAuth && userLoggedIn) {
        return <Redirect to="/" />;
    } else {
        return <Route component={props.component} {...props} />;
    }
};

export default AuthRoute;
