import React, { PureComponent } from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

class DateTimePickerField extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
    };
  }

  handleChange = (date) => {
    this.setState({
      startDate: date,
    });
    this.props.onChange(date);
  };

  render() {
    return (
      <div className="date-picker">
        <DatePicker
          timeFormat="HH:mm"
          className="form__form-group-datepicker"
          selected={this.state.startDate}
          onChange={this.handleChange}
          showTimeSelect
          dateFormat="LLL"
        />
      </div>
    );
  }
}

const renderDateTimePickerField = props => (
  <DateTimePickerField
    {...props.input}
  />
);

renderDateTimePickerField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
  }).isRequired,
};

export default renderDateTimePickerField;
