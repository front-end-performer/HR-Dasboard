import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from '../../../../axios';
import { totalUsers } from '../../../../actions';
import { Card, CardBody, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const RegisterNewClient = () => {
    const [data, setData] = useState();
    const [values, handleChange] = useStatefulFields();
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('/total-clients').then(({ data }) => {
            setData({
                data: data
            });
        });
    }, [data]);

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
        }).catch(error => {
            console.log("register submit error", error);
            this.setState({
                error: true
            });
        });
    }

    return (
        <Col md={12} lg={12} style={{ padding: 0 }}>
            <Card>
                <CardBody>
                    <Form>
                        <FormGroup row>
                            <Label style={{ fontSize: '0.9em' }} for="exampleEmail" sm={2}>First Name</Label>
                            <Col sm={10}>
                                <Input onChange={handleChange} type="text" name="first" id="exampleText" placeholder="first name" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label style={{ fontSize: '0.9em' }} for="exampleEmail" sm={2}>Last Name</Label>
                            <Col sm={10}>
                                <Input onChange={handleChange} type="text" name="last" id="exampleText" placeholder="last name" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label style={{ fontSize: '0.9em' }} for="exampleEmail" sm={2}>Email</Label>
                            <Col sm={10}>
                                <Input onChange={handleChange} type="email" name="email" id="exampleEmail" placeholder="email" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label style={{ fontSize: '0.9em' }} for="examplePassword" sm={2}>Password</Label>
                            <Col sm={10}>
                                <Input onChange={handleChange} type="password" name="password" id="examplePassword" placeholder="password" />
                            </Col>
                        </FormGroup>
                        {/* <FormGroup row>
                                <Label style={{fontSize: '0.9em'}} for="exampleEmail" sm={2}>Phone</Label>
                                <Col sm={10}>
                                    <Input onChange={e => this.handleChange(e)} type="number" name="phone" id="exampleEmail" placeholder="phone" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label style={{fontSize: '0.9em'}} for="exampleSelect" sm={2}>Gender</Label>
                                <Col sm={10}>
                                    <Input onChange={e => this.handleChange(e)} type="select" name="sex" id="exampleSelect">
                                        <option>Select</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label style={{fontSize: '0.9em'}} for="exampleEmail" sm={2}>DOB</Label>
                                <Col sm={10}>
                                    <Input onChange={e => this.handleChange(e)} type="date" name="dob" id="exampleDate" placeholder="your DOB" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label style={{fontSize: '0.9em'}} for="examplePassword" sm={2}>Address</Label>
                                <Col sm={10}>
                                    <Input onChange={e => this.handleChange(e)} type="street" name="address" id="exampleAddress" placeholder="address" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label style={{fontSize: '0.9em'}} for="exampleSelect" sm={2}>Package</Label>
                                <Col sm={10}>
                                    <Input onChange={e => this.handleChange(e)} type="select" name="select" id="exampleSelect">
                                        <option>8 weeks</option>
                                        <option>12 weeks</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label style={{fontSize: '0.9em'}} for="exampleText" sm={2}>Additional info</Label>
                                <Col sm={10}>
                                    <Input onChange={e => this.handleChange(e)} type="textarea" name="addInfo" id="exampleText" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
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
