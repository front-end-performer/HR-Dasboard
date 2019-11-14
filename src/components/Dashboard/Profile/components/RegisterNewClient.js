import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from '../../../../axios';
import { totalUsers, newClients } from '../../../../actions';
import { Card, CardBody, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const RegisterNewClient = () => {
    const [values, handleChange] = useStatefulFields();
    const dispatch = useDispatch();

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

    const register = () => {
        axios.post('/register-newuser', values).then(() => {
            // location.replace('/');
            dispatch(totalUsers());
            dispatch(newClients());
        }).catch(error => {
            console.log("register submit error", error);
        });
    }

    return (
        <Col md={12} lg={12} style={{ padding: 0 }}>
            <Card>
                <CardBody>
                    <Form>
                        <FormGroup row>
                            <Label style={{ fontSize: '0.9em' }} for="exampleSelect" sm={2}>Gender</Label>
                            <Col sm={10}>
                                <Input onChange={handleChange} type="select" name="gender" id="exampleSelect">
                                    <option>Select</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Fitness Animal 'Grrrr'</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label style={{ fontSize: '0.9em' }} for="exampleFirst" sm={2}>First Name</Label>
                            <Col sm={10}>
                                <Input onChange={handleChange} type="text" name="first" id="exampleFirst" placeholder="first name" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label style={{ fontSize: '0.9em' }} for="exampleLast" sm={2}>Last Name</Label>
                            <Col sm={10}>
                                <Input onChange={handleChange} type="text" name="last" id="exampleLast" placeholder="last name" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label style={{ fontSize: '0.9em' }} for="exampleEmail" sm={2}>Email</Label>
                            <Col sm={10}>
                                <Input onChange={handleChange} type="email" name="email" id="exampleEmail" placeholder="email" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label style={{ fontSize: '0.9em' }} for="examplePhone" sm={2}>Phone</Label>
                            <Col sm={10}>
                                <Input onChange={handleChange} type="number" name="phone" id="examplePhone" placeholder="phone" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label style={{ fontSize: '0.9em' }} for="exampleDOB" sm={2}>DOB</Label>
                            <Col sm={10}>
                                <Input onChange={handleChange} type="date" name="dob" id="exampleDOB" placeholder="your DOB" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label style={{ fontSize: '0.9em' }} for="exampleAddress" sm={2}>Address</Label>
                            <Col sm={10}>
                                <Input onChange={handleChange} type="address" name="address" id="exampleAddress" placeholder="address" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label style={{ fontSize: '0.9em' }} for="examplePackage" sm={2}>Package</Label>
                            <Col sm={10}>
                                <Input onChange={handleChange} type="select" name="package" id="examplePackage">
                                    <option>Select</option>
                                    <option>8 weeks</option>
                                    <option>12 weeks</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label style={{ fontSize: '0.9em' }} for="exampleAddInfo" sm={2}>Additional info</Label>
                            <Col sm={10}>
                                <Input onChange={handleChange} type="textarea" name="bio" id="exampleAddInfo" />
                            </Col>
                        </FormGroup>
                        {/* <FormGroup row>
                                <Label style={{fontSize: '0.9em'}} for="exampleFile" sm={2}>File</Label>
                                <Col sm={10}>
                                    <Input onChange={e => this.handleChange(e)} type="file" name="file" id="exampleFile" />
                                    <FormText color="muted">
                                        This is some placeholder block-level help text for the above input.
                                    </FormText>
                                </Col>
                            </FormGroup> */}
                        <FormGroup check row>
                            <Col sm={{ size: 10, offset: 2 }}>
                                <Button onClick={() => register()}>Submit</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
        </Col>
    );
}

export default RegisterNewClient;
