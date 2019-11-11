/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import { Badge, Card, CardBody, Col, Collapse } from 'reactstrap';
import PropTypes from 'prop-types';

import CloseIcon from 'mdi-react/CloseIcon';
import MinusIcon from 'mdi-react/MinusIcon';
import AutorenewIcon from 'mdi-react/AutorenewIcon';
import LoadingIcon from 'mdi-react/LoadingIcon';

export default class AlertComponent extends PureComponent {
  static propTypes = {
    divider: PropTypes.bool,
    color: PropTypes.string,
    title: PropTypes.string,
    subhead: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.string,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number,
    sm: PropTypes.number,
    xs: PropTypes.number,
    before: PropTypes.element,
    panelClass: PropTypes.string,
  };

  static defaultProps = {
    divider: false,
    color: '',
    title: '',
    subhead: '',
    label: '',
    icon: '',
    md: 0,
    lg: 0,
    xl: 0,
    sm: 0,
    xs: 0,
    before: null,
    panelClass: '',
  };

  constructor() {
    super();

    this.state = {
      visible: true,
      collapse: true,
      refresh: false,
    };
  }

  onShow = () => {
    this.setState({ visible: true });
  };

  onDismiss = () => {
    this.setState({ visible: false });
  };

  onCollapse = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  onRefresh = () => {
    // your async logic here
    this.setState({ refresh: !this.state.refresh });
    setTimeout(() => this.setState({ refresh: false }), 5000);
  };

  render() {
    const {
      md, lg, xl, sm, xs, color, divider, icon, title, label, subhead, before, panelClass,
    } = this.props;

    if (this.state.visible) {
      return (
        <Col md={md} lg={lg} xl={xl} sm={sm} xs={xs}>
          <Card
            className={`panel${this.props.color ? ` panel--${color}` : ''}
            ${divider ? ' panel--divider' : ''}${this.state.collapse ? '' : ' panel--collapse'} ${panelClass}`}
          >
            <CardBody className="panel__body">
              {this.state.refresh ? <div className="panel__refresh"><LoadingIcon /></div> : ''}
              <div className="panel__btns">
                <button className="panel__btn" onClick={this.onCollapse}><MinusIcon /></button>
                <button className="panel__btn" onClick={this.onRefresh}><AutorenewIcon /></button>
                <button className="panel__btn" onClick={this.onDismiss}><CloseIcon /></button>
              </div>
              <div className="panel__title">
                <h5 className="bold-text">
                  {icon ? <span className={`panel__icon lnr lnr-${icon}`} /> : ''}
                  {title}
                  <Badge className="panel__label">{label}</Badge>
                </h5>
                <h5 className="subhead">{subhead}</h5>
              </div>
              <Collapse isOpen={this.state.collapse}>
                <div className="panel__content">
                  {this.props.children}
                </div>
              </Collapse>
            </CardBody>
          </Card>
          {before}
        </Col>
      );
    }

    return '';
  }
}

export const PanelTitle = ({ title }) => (
  <div className="panel__title">
    <h5 className="bold-text">
      {title}
    </h5>
  </div>
);
