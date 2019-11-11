import React, { Component } from 'react';
import axios from '../../../../axios';
import { Card, CardBody, Col } from 'reactstrap';
import { FaCheck } from "react-icons/fa";

class Planning extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ''
        };
    }

    componentDidMount() { 
        axios.get('/find_recent').then(({ data }) => { 
            this.setState({
                data: data
            });
        })
    }


    render() {
        return (
            <Col md={12} xl={2} lg={3} xs={12}>
                <Card>
                    <CardBody className="dashboard__card-widget">
                        <div className="card__title">
                            <h5 className="bold-text">Customers this month</h5>
                        </div>
                        <div className="dashboard__total">
                            <h5>
                                {this.state.data.length}
                            </h5>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default Planning;
