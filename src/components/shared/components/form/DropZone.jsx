import React, { PureComponent } from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';

class DropZoneField extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    customHeight: PropTypes.bool,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
      })),
    ]).isRequired,
  };

  static defaultProps = {
    customHeight: false,
  };

  constructor() {
    super();
    this.state = {};
  }

  removeFile(index, e) {
    e.preventDefault();
    this.props.onChange(this.props.value.filter((val, i) => i !== index));
  }

  render() {
    const files = this.props.value;

    return (
      <div className={`dropzone dropzone--single${this.props.customHeight ? ' dropzone--custom-height' : ''}`}>
        <Dropzone
          className="dropzone__input"
          accept="image/jpeg, image/png"
          name={this.props.name}
          multiple={false}
          onDrop={(filesToUpload) => {
            this.props.onChange(filesToUpload);
          }}
        >
          {(!files || files.length === 0) &&
          <div className="dropzone__drop-here"><span className="lnr lnr-upload" /> Drop file here to upload</div>}
        </Dropzone>
        {files && Array.isArray(files) && files.length > 0 &&
        <div className="dropzone__img">
          <img src={files[0].preview} alt="drop-img" />
          <p className="dropzone__img-name">{files[0].name}</p>
          <button className="dropzone__img-delete" onClick={e => this.removeFile(0, e)}>
            Remove
          </button>
        </div>}
      </div>
    );
  }
}

const renderDropZoneField = props => (
  <DropZoneField
    {...props.input}
    customHeight={props.customHeight}
  />
);

renderDropZoneField.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string,
    onChange: PropTypes.func,
  }).isRequired,
  customHeight: PropTypes.bool,
};

renderDropZoneField.defaultProps = {
  customHeight: false,
};

export default renderDropZoneField;
