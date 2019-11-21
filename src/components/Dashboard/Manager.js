import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import TotalMemebers from './Profile/components/TotalMembers';
import Attendency from './Profile/components/Attendency';
import NewMembersChart from './Profile/components/NewMembersChart';
import TimeDate from './Profile/components/TimeDate';
import JustifyTabs from './Profile/components/JustifyTabs';
import AdminChat from './Profile/components/AdminChat';

const Manager = () => {
    return (
        <Container>
            <Row>
                <TotalMemebers />
                <Attendency />
                <NewMembersChart />
                <TimeDate />
            </Row>
            <Row>
                <Col md={12}>
                    <h3 style={{ height: '20px' }} className="page-title"></h3>
                </Col>
                <JustifyTabs />
                <AdminChat />
            </Row>
        </Container>
    );
}

    export default Manager;
    