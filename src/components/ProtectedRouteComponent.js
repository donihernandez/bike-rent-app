import React from 'react';
import { Route,Redirect } from 'react-router-dom';
import Layout from "../layout/Layout";
import Cookies from 'js-cookie';

export default function ProtectedRouteComponent({ component: Component, ...rest }) {
    const isAuthenticated = Cookies.get('token');

    return (
        <Route { ...rest } render={(props) => (
            isAuthenticated ?
                <Layout>
                    <Component  {...props} />
                </Layout> :
                <Redirect to="/login"/>
        )} />
    );
}