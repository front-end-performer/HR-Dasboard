/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';

class DropZoneMultipleField extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
      })),
    ]).isRequired,
  };

  constructor() {
    super();
    this.state = {};
  }

  removeFile= (index, e) => {
    e.preventDefault();
    this.props.onChange(this.props.value.filter((val, i) => i !== index));
  };

  render() {
    const files = this.props.value;
    const { name, onChange, value } = this.props;

    return (
      <div className="dropzone dropzone--multiple">
        <Dropzone
          className="dropzone__input"
          accept="image/jpeg, image/png"
          name={name}
          onDrop={(filesToUpload) => {
            onChange(value ? value.concat(filesToUpload) : filesToUpload);
          }}
        >
          {(!files || files.length === 0) &&
          <div className="dropzone__drop-here"><span className="lnr lnr-upload" /> Drop files here to upload</div>}
        </Dropzone>
        {files && Array.isArray(files) &&
        <div className="dropzone__imgs-wrapper">
          {files.map((file, i) =>
            (
              <div className="dropzone__img" key={i} style={{ backgroundImage: `url(${file.preview})` }}>
                <p className="dropzone__img-name">{file.name}</p>
                <button className="dropzone__img-delete" onClick={e => this.removeFile(i, e)}>
                Remove
                </button>
              </div>
            ))}
        </div>}
      </div>
    );
  }
}

const renderDropZoneMultipleField = props => (
  <DropZoneMultipleField
    {...props.input}
  />
);

renderDropZoneMultipleField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
  }).isRequired,
};

export default renderDropZoneMultipleField;
