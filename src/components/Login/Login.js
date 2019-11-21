import React, { Component } from 'react';
import axios from '../../axios'; 
import { Animated } from "react-animated-css";
import { HashRouter, Link } from 'react-router-dom';
import { Button } from 'reactstrap';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }

    login() {
        if (this.state.email != '', this.state.password != '') {
            axios.post('/login', {
                email: this.state.email,
                password: this.state.password
            }).then(() => {
                location.replace('/');
            }).catch(error => {
                console.log(error);
                this.setState({
                    error: true
                });
            });
        } else {
            this.setState({
                error: true
            });
        }

    }

    render() {
        return (
            <React.Fragment>
                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                    <h3 style={{ textAlign: "center" }}>Admin form.</h3>
                    <br />
                    <div className="form">
                        {this.state.error && (<div className="error">Something went wrong. Please try again!</div>)}
                        <input type="email" className="inputs" required name="email" onChange={e => this.handleChange(e)} />
                        <label>{this.state.email != "" ? 'Your email' : "*email"}</label>
                        <input type="password" className="inputs" required name="password" onChange={e => this.handleChange(e)} />
                        <label>{this.state.password != "" ? 'Your password' : "*password"}</label>
                        <Button color="secondary" size="sm" onClick={() => this.login()}>Login</Button>
                        <HashRouter>
                            <span className="form__lnk">Not yet, a member? <Link className="lnks" to="/">Register</Link></span>
                        </HashRouter>
                    </div>
                </Animated>
            </React.Fragment>
        );
    }
}

export default Login;
