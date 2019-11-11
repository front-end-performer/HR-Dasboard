import React, { PureComponent } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

class SelectField extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })),
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
      }),
    ]).isRequired,
  };

  static defaultProps = {
    placeholder: '',
    options: [],
  };

  handleChange = (selectedOption) => {
    this.props.onChange(selectedOption);
  };

  render() {
    const {
      value, name, placeholder, options,
    } = this.props;

    return (
      <Select
        name={name}
        value={value}
        onChange={this.handleChange}
        options={options}
        clearable={false}
        className="react-select"
        placeholder={placeholder}
        classNamePrefix="react-select"
      />
    );
  }
}

const renderSelectField = props => (
  <div className="form__form-group-input-wrap">
    <SelectField
      {...props.input}
      options={props.options}
      placeholder={props.placeholder}
    />
    {props.meta.touched && props.meta.error && <span className="form__form-group-error">{props.meta.error}</span>}
  </div>
);

renderSelectField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })),
  placeholder: PropTypes.string,
};

renderSelectField.defaultProps = {
  meta: null,
  options: [],
  placeholder: '',
};

export default renderSelectField;
