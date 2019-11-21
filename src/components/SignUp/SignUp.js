import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HashRouter, Link } from 'react-router-dom';
import { signUp, totalPilatesUsers } from '../../actions';
import { Animated } from "react-animated-css";
import { Button } from 'reactstrap';

const SignUpForClass = () => {
    const dispatch = useDispatch();
    const [values, handleChange] = useStatefulFields();

    useEffect(() => { 
            dispatch(totalPilatesUsers());
    }, []);

    function useStatefulFields() {
        const [values, setValues] = useState({});

        const handleChange = e => {
            setValues({
                ...values,
                [e.target.name]: e.target.value
            });
        };
        return [values, handleChange];
    }

    return (
        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
            <h3 style={{ textAlign: "center" }}>Signup for a class, now.</h3>
            <br />
            <div className="form">
                <input type="email" className="inputs" required name="email" onChange={handleChange} />
                <select required className="inputs" type="select" name="select" onChange={handleChange}  >
                    <option value="">--Please choose your class--</option>
                    <option value="pilates">Hot Pilates</option>
                    <option value="yoga">Yin Yoga</option>
                </select>
                <Button color="secondary" size="sm" onClick={() => dispatch(signUp(values))}>SignUp</Button>
                <HashRouter>
                    <span className="form__lnk">Already a member? <Link className="lnks" to="/login">Login</Link></span>
                </HashRouter>
            </div>
        </Animated>
    );
}


export default SignUpForClass;