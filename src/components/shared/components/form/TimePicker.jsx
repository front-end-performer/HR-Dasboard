import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TimePicker from 'rc-time-picker';
import AvTimerIcon from 'mdi-react/AvTimerIcon';
import classNames from 'classnames';

class TimePickerField extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    timeMode: PropTypes.bool.isRequired,
  };

  state = {
    open: false,
  };

  setOpen = ({ open }) => {
    this.setState({ open });
  };

  toggleOpen = (e) => {
    e.preventDefault();
    this.setState({
      open: !this.state.open,
    });
  };

  render() {
    const { name, onChange, timeMode } = this.props;
    const btnClass = classNames({
      'form__form-group-button': true,
      active: this.state.open,
    });

    return (
      <div className="form__form-group-field">
        <TimePicker
          open={this.state.open}
          onOpen={this.setOpen}
          onClose={this.setOpen}
          name={name}
          onChange={onChange}
          showSecond={false}
          use12Hours={timeMode}
        />
        <button className={btnClass} onClick={this.toggleOpen}>
          <AvTimerIcon />
        </button>
      </div>
    );
  }
}

const renderTimePickerField = props => (
  <TimePickerField
    {...props.input}
    timeMode={props.timeMode}
  />
);

renderTimePickerField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
  }).isRequired,
  timeMode: PropTypes.bool,
};

renderTimePickerField.defaultProps = {
  timeMode: false,
};

export default renderTimePickerField;
