import React, { Component } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { FaCheck } from "react-icons/fa";
import { Pie } from 'react-chartjs-2';

const data = {
    datasets: [{
        data: [300, 50],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
        ],
        borderColor: 'rgba(255,255,255,0.54)',
    }],
};


class Design extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: true
        };
    }
    render() {
        return (
            <Col md={12} xl={2} lg={3} xs={12}>
                <Card>
                    <CardBody className="dashboard__card-widget">
                        <div className="card__title">
                            <h5 className="bold-text">Design</h5>
                        </div>
                        <div className="dashboard__total">
                            {!this.state.activeIndex ? <Pie data={data} /> : <p className="faCheck"><FaCheck /></p>}
                        </div>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default Design;
