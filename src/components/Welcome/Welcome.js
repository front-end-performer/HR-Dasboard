import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Particles from 'react-particles-js';
import { particles } from '../../../particlesjs-config';
import Registration from '../Registration/Registration';
import Login from '../Login/Login';

const Welcome = () => {
    return (
        <section className="wrapper">
            <Particles className="particles-js" params={{
                particles
            }} />
            <img className="corianderImg " src="./assets/coriander_img.png" alt="coriander_img" />
            <div className="logo_welcome">
                <h1 className="logo__title">Social Network</h1>
            </div>
            <div className="form__container">
                <HashRouter>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </HashRouter>
            </div>
        </section>
    );
};

export default Welcome;