/* eslint-disable no-alert */
import React, { useState} from 'react';
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

const DevelopmentStatusCard = () => {
    const [activeIndex, setActiveIndex] = useState(true);

    return (
        <Col md={12} xl={2} lg={3} xs={12}>
            <Card>
                <CardBody className="dashboard__card-widget">
                    <div className="card__title">
                        <h5 className="bold-text">Development</h5>
                    </div>
                    <div className="dashboard__total">
                        {activeIndex ? <Pie data={data} /> : <p className="faCheck"><FaCheck /></p>}
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
}

export default DevelopmentStatusCard;
