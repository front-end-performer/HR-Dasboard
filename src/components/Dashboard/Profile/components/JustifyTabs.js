import React, { useState } from 'react';
import { Card, CardBody, Col, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import VerticalTabs from './VerticalTabs';
import RegisterNewClient from './RegisterNewClient';
import Clients from './Clients';
import Notes from './Notes';

const JustifyTabs = () => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(
                tab
            );
        }
    };

    return (
        <Col md={12} lg={12} xl={8}>
            <Card>
                <CardBody>
                    <div className="tabs tabs--justify">
                        <div className="tabs__wrap">
                            <Nav tabs>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTab === '1' })}
                                        onClick={() =>
                                            toggle('1')
                                        }
                                    >
                                        Classes
                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTab === '2' })}
                                        onClick={() =>
                                            toggle('2')
                                        }
                                    >
                                        Register New Client
                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTab === '3' })}
                                        onClick={() =>
                                            toggle('3')
                                        }
                                    >
                                        Notes
                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTab === '4' })}
                                        onClick={() =>
                                            toggle('4')
                                        }
                                    >
                                        Clients
                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="1">
                                    <VerticalTabs />
                                </TabPane>
                                <TabPane tabId="2">
                                    <RegisterNewClient />
                                </TabPane>
                                <TabPane tabId="3">
                                    <Notes />
                                </TabPane>
                                <TabPane tabId="4">
                                    <Clients />
                                </TabPane>
                            </TabContent>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
}

export default JustifyTabs;
