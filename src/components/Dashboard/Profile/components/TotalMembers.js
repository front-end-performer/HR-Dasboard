import React, { useEffect }  from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { totalUsers } from '../../../../actions';

const TotalMemebers = () => {
    const dispatch = useDispatch();
    const total = useSelector(
        state => state.data && state.data.length
    );
    

    useEffect(() => {
        dispatch(totalUsers());
    }, []);

    return (
        <Col md={12} xl={2} lg={2} xs={12}>
            <Card>
                <CardBody className="dashboard__card-widget">
                    <div className="card__title">
                        <h5 className="bold-text">Total members</h5>
                    </div>
                    <div className="dashboard__total">
                        <p>
                            {total}
                        </p>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
}

export default TotalMemebers;
