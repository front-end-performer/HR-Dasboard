import React, { Component } from 'react';
import { Card, CardBody, Col, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import PilatesTable from './PilatesTable';
import YinTable from './YinTable';

class JustifyTabsBorderedBottom extends Component {

    constructor() {
        super();
        this.state = {
            activeTab: '1',
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    }

    render() {

        return (
            <Col md={12} lg={12} xl={12} style={{ padding: 0 }}>
                <Card>
                    <CardBody>
                        <div className="tabs tabs--justify tabs--bordered-bottom">
                            <div className="tabs__wrap">
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '1' })}
                                            onClick={() => {
                                                this.toggle('1');
                                            }}
                                        >
                                            Hot Pilates
                                    </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '2' })}
                                            onClick={() => {
                                                this.toggle('2');
                                            }}
                                        >
                                            Yin Yoga
                                    </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="1">
                                        <PilatesTable />
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <YinTable />
                                    </TabPane>
                                </TabContent>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default JustifyTabsBorderedBottom;
