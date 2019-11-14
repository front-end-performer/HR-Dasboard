import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newClients, lastMonthClients } from '../../../../actions';
import { Card, CardBody, Col } from 'reactstrap';
import { Bar } from 'react-chartjs-2';

const getState = (x, y) => ({
    
        labels: ['Last Month', 'Current Month'],
        datasets: [
            {
                label: 'Statistics',
                backgroundColor: '#FF6384',
                borderColor: '#FF6384',
                borderWidth: 1,
                hoverBackgroundColor: '#36A2EB',
                hoverBorderColor: '#FF6384',
                data: [x, y],
            },
        ]
})

const DevelopmentStatusCard = () => {
    const [data, setData] = useState();
    const dispatch = useDispatch();
    const newClientsToday = useSelector(
        state => state.client && state.client.length
    );

    const lastMonth = useSelector(
        state => state.prevClient && state.prevClient.length
    );

    const options = {
        legend: {
            position: 'bottom',
        },
        scales: {
            xAxes: [
                {
                    gridLines: {
                        color: 'rgb(204, 204, 204)',
                        borderDash: [3, 3],
                    },
                    stacked: true,
                    ticks: {
                        fontColor: 'rgb(204, 204, 204)',
                    },
                },
            ],
            yAxes: [
                {
                    gridLines: {
                        color: 'rgb(204, 204, 204)',
                        borderDash: [3, 3],
                    },
                    stacked: true,
                    ticks: {
                        fontColor: 'rgb(204, 204, 204)',
                    },
                },
            ],
        },
    }

    useEffect(() => {
        setData(getState(lastMonth, newClientsToday))
        dispatch(newClients());
        dispatch(lastMonthClients());
    }, [lastMonth, newClientsToday]);

    if (!data) { 
        return null;
    }

    return (
        <Col md={12} xl={4} lg={4} xs={12}>
            <Card>
                <CardBody className="dashboard__card-widget">
                    <div className="card__title">
                        <h5 className="bold-text">New Members</h5>
                    </div>
                    <div className="dashboard__total">
                        <Bar data={data} options={options} />
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
}

export default DevelopmentStatusCard;
