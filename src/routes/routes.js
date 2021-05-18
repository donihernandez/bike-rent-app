import {BrowserRouter as Router, Switch, Route}  from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import LoaderComponent from '../components/LoaderComponent';
import { CreateBrowserHistory as history } from 'history';

// Pages
const HomePage = lazy(() => import('../pages/HomePage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RentABikePage = lazy(() => import('../pages/RentABikePage'));
const ErrorPage = lazy(() => import('../pages/ErrorPage'));


export default function Routes() {
    return (
        <Suspense fallback={ <LoaderComponent /> }>
            <Router history={ history }>
                <Switch>
                    <Route path="/" exact component={ HomePage }/>
                    <Route path="/login" exact component={ LoginPage }/>
                    <Route path="/rent" exact component={ RentABikePage }/>
                    <Route path="*" component={ ErrorPage }/>
                </Switch>
            </Router>
        </Suspense>
    );
}