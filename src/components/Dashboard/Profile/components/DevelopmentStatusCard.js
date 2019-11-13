import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newClients } from '../../../../actions';
import { Card, CardBody, Col } from 'reactstrap';
// import { FaCheck } from "react-icons/fa";
// import { Pie } from 'react-chartjs-2';

// const data = {
//     labels: [
//         'Pilates',
//         'Yoga',
//     ],
//     datasets: [{
//         data: [300, 50],
//         backgroundColor: [
//             '#FF6384',
//             '#36A2EB',
//         ],
//         hoverBackgroundColor: [
//             '#FF6384',
//             '#36A2EB',
//         ],
//         borderColor: 'rgba(255,255,255,0.54)',
//     }],
// };

const DevelopmentStatusCard = () => {
    // const [activeIndex, setActiveIndex] = useState(true);
    const dispatch = useDispatch();
    const newClientsToday = useSelector(
        state => state.client && state.client.length
    );

    console.log("newClientsToday lenght", newClientsToday);
    

    useEffect(() => { 
        dispatch(newClients());
    }, []);

    return (
        <Col md={12} xl={4} lg={4} xs={12}>
            <Card>
                <CardBody className="dashboard__card-widget">
                    <div className="card__title">
                        <h5 className="bold-text">New Members</h5>
                        <span stle={{fontSize: '0.7em'}}>Joined today.</span>
                    </div>
                    <div className="dashboard__total">
                        <h5>{newClientsToday}</h5>
                        {/* {activeIndex ? <Pie data={data} /> : <p className="faCheck"><FaCheck /></p>} */}
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
}

export default DevelopmentStatusCard;
