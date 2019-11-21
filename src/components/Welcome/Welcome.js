import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import SignUp from '../SignUp/SignUp';
import Login from '../Login/Login';
import DefaultImg from '../DefaultImg/DefaultImg';

const Welcome = () => {
    return (
        <section className="wrapper">
            <div className="logo_welcome">
                <h1 className="logo__title">DASHBOARD</h1>
            </div>
            <div className="form__container">
                <HashRouter>
                    <Route exact path="/" component={SignUp} />
                    <Route path="/Login" component={Login} />
                    <Route path="/default" component={DefaultImg} />
                </HashRouter>
            </div>
        </section>
    );
};

export default Welcome;