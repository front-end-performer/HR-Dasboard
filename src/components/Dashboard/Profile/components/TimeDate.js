import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
const moment = require('moment');

const TimeDate = () => {
    return (
        <Col md={12} xl={2} lg={2} xs={12}>
            <Card>
                <CardBody className="dashboard__card-widget">
                    <div className="card__title">
                        <h5 className="bold-text">Date and Time</h5>
                    </div>
                    <div className="dashboard__total">
                        <p className='dashboard__total-stat'>{moment(new Date()).format('MMMM Do YYYY')}</p>
                        <p>{moment(new Date()).format('h:mm a')}</p>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
}


export default TimeDate;
