import React from 'react';
import { Route,Redirect } from 'react-router-dom';
import Layout from "../layout/Layout";
import {useSelector} from "react-redux";

export default function ProtectedRouteComponent({ component: Component, ...rest }) {
    const isAuthenticated = useSelector(state => state.userReducer.token);

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