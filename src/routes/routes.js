import {BrowserRouter as Router, Switch, Route}  from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import LoaderComponent from '../components/LoaderComponent';
import { createBrowserHistory } from 'history';
import ProtectedRouteComponent from "../components/ProtectedRouteComponent";

// Pages
const HomePage = lazy(() => import('../pages/HomePage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const RentABikePage = lazy(() => import('../pages/RentPage'));
const ErrorPage = lazy(() => import('../pages/ErrorPage'));


export default function Routes() {
    return (
        <Suspense fallback={ <LoaderComponent /> }>
            <Router history={ createBrowserHistory() }>
                <Switch>
                    <ProtectedRouteComponent path="/" exact component={ HomePage }/>
                    <Route path="/login" exact component={ LoginPage }/>
                    <Route path="/register" exact component={ RegisterPage }/>
                    <ProtectedRouteComponent path="/rent" exact component={ RentABikePage }/>
                    <Route path="*" component={ ErrorPage }/>
                </Switch>
            </Router>
        </Suspense>
    );
}