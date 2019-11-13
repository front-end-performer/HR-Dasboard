import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, Col } from 'reactstrap';
import { Doughnut } from 'react-chartjs-2';

const getState = (x, y) => ({
    labels: [
        'Pilates',
        'Yin Yoga'
    ],
    datasets: [{
        data: [x, y],
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
        state => state.pilates_users && state.pilates_users.length
    );

    // console.log("totalPilatesUsers", totalPilatesUsers);

    const totalYogaUser = useSelector(
        state => state.yoga_users && state.yoga_users.length
    );
    // console.log("totalYogaUser", totalYogaUser);

    useEffect(() => {
        setData(getState(totalPilatesUsers, totalYogaUser));
    }, [totalPilatesUsers, totalYogaUser]);

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
