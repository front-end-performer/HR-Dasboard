import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, Col } from 'reactstrap';
import { Doughnut } from 'react-chartjs-2';

const getState = (x) => ({
    labels: [
        'Red',
        'Blue'
    ],
    datasets: [{
        data: [x, 150],
        backgroundColor: [
            '#FF6384',
            '#36A2EB'

        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB'

        ],
        borderColor: 'rgba(255,255,255,0.54)',
    }],
});



const DynamiclyRefreshedDoughnut = () => {
    const [data, setData] = useState();

    const totalPilatesUsers = useSelector(
        state => state.data && state.data.length
    );

    const totalYogaUser = useSelector(
        state => state.data && state.data.length
    );

    useEffect(() => {
        setData(getState(totalPilatesUsers));
    }, [totalPilatesUsers]);

    if (!totalPilatesUsers) {
        return null;
    }

    return (
        <Col md={12} xl={4} lg={4} xs={12}>
            <Card>
                <CardBody className="dashboard__card-widget">
                    <div className="card__title">
                        <h5 className="bold-text">Today's attendancy</h5>
                    </div>
                    {/* <div className="dashboard__total"> */}
                    <Doughnut data={data} />
                    {/* </div> */}
                </CardBody>
            </Card>
        </Col>
    );
}

export default DynamiclyRefreshedDoughnut;
