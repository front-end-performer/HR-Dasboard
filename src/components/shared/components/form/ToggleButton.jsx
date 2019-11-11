import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ToggleButtonField extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]).isRequired,
  };

  static defaultProps = {
    defaultChecked: false,
    disabled: false,
  };

  componentDidMount() {
    this.props.onChange(this.props.defaultChecked);
  }

  render() {
    const {
      name, disabled, value, onChange,
    } = this.props;

    return (
      <div className="toggle-btn">
        <input
          className="toggle-btn__input"
          type="checkbox"
          name={name}
          onChange={onChange}
          checked={value}
          disabled={disabled}
        />
        <button
          className="toggle-btn__input-label"
          onClick={() => onChange(!value)}
        >Toggle
        </button>
      </div>
    );
  }
}

const renderToggleButtonField = props => (
  <ToggleButtonField
    {...props.input}
    defaultChecked={props.defaultChecked}
    disabled={props.disabled}
  />
);

renderToggleButtonField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
  }).isRequired,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
};

renderToggleButtonField.defaultProps = {
  defaultChecked: false,
  disabled: false,
};

export default renderToggleButtonField;
