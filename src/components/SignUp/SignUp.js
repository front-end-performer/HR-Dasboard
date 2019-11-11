import React, { Component } from 'react';
import { HashRouter, Link } from 'react-router-dom';
import axios from '../../axios'; // './axios' instance
import { Animated } from "react-animated-css";
import { Button } from 'reactstrap';

class SignUpForClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            email: '',
            select: ''
        };
    }

    handleChange({ target }) {
        console.log(target.value);
        this.setState({
            [target.name]: target.value
        });
    }

    register() {
        // console.log(this.state.select);

        // if (this.state.select == "pilates") {
            if (this.state.email != '' && this.state.email.indexOf('@') != -1) {
                axios.post('/register', {
                    email: this.state.email,
                    select: this.state.select
                }).then(({ rows }) => {
                    console.log("clientside result pilates", rows);
                    location.replace('/default');
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
        // }
        // else if (this.state.select == "yoga") {
        //     axios.post('/register', {
        //         email: this.state.email,
        //         select: this.state.select
        //     }).then(() => {
        //         // location.replace('/welcome');
        //     }).catch(error => {
        //         console.log("submit error", error);
        //         this.setState({
        //             error: true
        //         });
        //     });
        // }
        }

    render() {
        return (
            <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                <div className="form">
                    {this.state.error && (<div className="error">Something went wrong. Please try again!</div>)}
                    <input type="email" className="inputs" required name="email" onChange={e => this.handleChange(e)} />
                    <label>{this.state.email.indexOf('@') != -1 ? 'Your email' : "*email"}</label>

                    <select required className="inputs" type="select" name="select" onChange={e => this.handleChange(e)} >
                        <option value="">--Please choose your class--</option>
                        <option value="pilates">Hot Pilates</option>
                        <option value="yoga">Yin Yoga</option>
                    </select>
                    <label>{this.state.select != null ? "Selected" : '*select'}</label>

                    <Button color="secondary" size="sm" onClick={() => this.register()}>SignUp</Button>
                    <HashRouter>
                        <span className="form__lnk">Already a member? <Link className="lnks" to="/login">Login</Link></span>
                    </HashRouter>
                </div>
            </Animated>
        );
    }
}

export default SignUpForClass;
