import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Visits from './Profile/components/Visits';
import Attendency from './Profile/components/Attendency';
// import Design from './Profile/components/Design';
import DevelopmentStatusCard from './Profile/components/DevelopmentStatusCard';
import BounceRate from './Profile/components/BounceRate';
import JustifyTabs from './Profile/components/JustifyTabs';
import ChatRoom from './Profile/components/ChatRoom';

const Manager = () => {
    return (
        <Container>
            <Row>
                <Visits />
                <Attendency />
                {/* <Design /> */}
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
    