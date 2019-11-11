/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
// import { BarChart, Bar, Cell, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Page A', pv: 25 },
    { name: 'Page B', pv: 30 },
    { name: 'Page C', pv: 55 },
    { name: 'Page D', pv: 42 },
    { name: 'Page E', pv: 85 },
    { name: 'Page F', pv: 45 },
    { name: 'Page G', pv: 21 },
    { name: 'Page H', pv: 56 },
    { name: 'Page I', pv: 68 },
    { name: 'Page J', pv: 32 },
];

class BounceRate extends Component {

    constructor() {
        super();
        this.state = {
            activeIndex: 0,
        };
    }

    //   handleClick = (index) => {
    //     this.setState({
    //       activeIndex: index,
    //     });
    //   };

    render() {
        const { activeIndex } = this.state;
        const activeItem = data[activeIndex];

        return (
            <Col md={12} xl={3} lg={3} xs={12}>
                <Card>
                    <CardBody className="dashboard__card-widget">
                        <div className="card__title">
                            <h5 className="bold-text">Launch date</h5>
                        </div>
                        <div className="dashboard__total">
                            <p className='dashboard__total-stat'>Friday, December 31</p>
                            <p>120 days</p>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default BounceRate;
