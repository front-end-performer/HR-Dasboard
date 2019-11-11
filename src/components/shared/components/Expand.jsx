import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import LoadingIcon from 'mdi-react/LoadingIcon';
import classNames from 'classnames';

export default class Expand extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    outline: PropTypes.bool,
    color: PropTypes.string,
  };

  static defaultProps = {
    title: '',
    outline: false,
    color: 'secondary',
  };

  constructor() {
    super();
    this.state = {
      load: false,
    };
  }

  onLoad = () => {
    this.setState({
      load: true,
    });
    this.request();
  };

  request = () => {
    // your async logic here
    setTimeout(() => this.setState({ load: false }), 5000);
  };

  render() {
    const expandClass = classNames({
      icon: true,
      expand: true,
      'expand--load': this.state.load,
    });

    return (
      <Button
        onClick={this.onLoad}
        className={expandClass}
        color={this.props.color}
        outline={this.props.outline}
      >
        <p><LoadingIcon /> {this.props.title}</p>
      </Button>
    );
  }
}
