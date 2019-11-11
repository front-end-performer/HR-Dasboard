import React, { useEffect } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { totalUsers } from '../../actions';
import Visits from './Profile/components/Visits';
import Planning from './Profile/components/Planning';
import Design from './Profile/components/Design';
import DevelopmentStatusCard from './Profile/components/DevelopmentStatusCard';
import BounceRate from './Profile/components/BounceRate';
import JustifyTabs from './Profile/components/JustifyTabs';
import ChatRoom from './Profile/components/ChatRoom';

const Manager = () => {
    const dispatch = useDispatch();
    const total = useSelector(
        state => state.users && state.users.length
    );
    

    useEffect(() => {
        dispatch(totalUsers());
    }, []);


    return (
        <Container>
            <Row>
                <Visits total={total} />
                <Planning />
                <Design />
                <DevelopmentStatusCard />
                <BounceRate />
            </Row>
            <Row>
                <Col md={12}>
                    <h3 style={{ height: '20px' }} className="page-title"></h3>
                </Col>
                <JustifyTabs />
                <ChatRoom />
            </Row>
        </Container>
    );
}

    export default Manager;