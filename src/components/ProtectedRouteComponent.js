import React, { useState } from 'react';
import { Route,Redirect } from 'react-router-dom';
import Layout from "../layout/Layout";

export default function ProtectedRouteComponent({ component: Component, ...rest }) {
    const [isAuthenticated, setIsAuthenticated] = useState(true);

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