import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Visits from './Profile/components/Visits';
import Attendency from './Profile/components/Attendency';
import DevelopmentStatusCard from './Profile/components/DevelopmentStatusCard';
import TimeDate from './Profile/components/TimeDate';
import JustifyTabs from './Profile/components/JustifyTabs';
import ChatRoom from './Profile/components/ChatRoom';

const Manager = () => {
    return (
        <Container>
            <Row>
                <Visits />
                <Attendency />
                <DevelopmentStatusCard />
                <TimeDate />
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
    