import React, { Component } from 'react';
import { HashRouter, Link } from 'react-router-dom';
import axios from '../../axios'; // './axios' instance
import { Animated } from "react-animated-css";

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            first: '',
            last: '',
            email: '',
            password: ''
        };
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }

    register() {
        if (this.state.first != '', this.state.last != '', this.state.password != '') {
            if (this.state.email != '' && this.state.email.indexOf('@') != -1) {
                axios.post('/register', {
                    first: this.state.first,
                    last: this.state.last,
                    email: this.state.email,
                    password: this.state.password
                }).then(() => {
                    location.replace('/');
                }).catch(error => {
                    console.log("submit error", error);
                    this.setState({
                        error: true
                    });
                });
            } else {
                this.setState({
                    error: true
                });
            }
        } else {
            this.setState({
                error: true
            });
        }
    }

    render() {
        return (
            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                <div className="form">
                    {this.state.error && (<div className="error">Something went wrong. Please try again!</div>)}
                    <input type="text" className="inputs" required name="first" onChange={e => this.handleChange(e)} />
                    <label>{this.state.first != "" ? "First name" : "*first name"}</label>
                    <input type="text" className="inputs" required name="last" onChange={e => this.handleChange(e)} />
                    <label>{this.state.last != "" ? 'Last name' : "*last name"}</label>
                    <input type="email" className="inputs" required name="email" onChange={e => this.handleChange(e)} />
                    <label>{this.state.email.indexOf('@') != -1 ? 'Your email' : "*email"}</label>
                    <input type="password" className="inputs" required name="password" onChange={e => this.handleChange(e)} />
                    <label>{this.state.password != "" ? 'Create password' : "*password"}</label>
                    <button onClick={() => this.register()}>Register</button>
                    <HashRouter>
                        <span className="form__lnk">Already a member? <Link className="lnks" to="/login">Login</Link></span>
                    </HashRouter>
                </div>
            </Animated>
        );
    }
}

export default Registration;
