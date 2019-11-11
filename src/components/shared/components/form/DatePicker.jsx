import React, { PureComponent } from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

class DatePickerField extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      startDate: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    });
    this.props.onChange(date);
  }

  render() {
    return (
      <div className="date-picker">
        <DatePicker
          className="form__form-group-datepicker"
          selected={this.state.startDate}
          onChange={this.handleChange}
          dateFormat="LL"
        />
      </div>
    );
  }
}

const renderDatePickerField = props => (
  <DatePickerField
    {...props.input}
  />
);

renderDatePickerField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
  }).isRequired,
};

export default renderDatePickerField;
