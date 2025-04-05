import React from "react";
import PropTypes from "prop-types";

const FilePicker = ({ onFileUpload }) => {
  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };
  console.log("FilePicker is rendered");

  return (
    <div className="file-picker">
      <label htmlFor="file-upload" className="file-upload-button">
        Upload Texture
      </label>
      <input
        type="file"
        id="file-upload"
        accept="image/*"
        onChange={handleChange}
        hidden
      />
    </div>
  );
};

FilePicker.propTypes = {
  onFileUpload: PropTypes.func.isRequired,
};

export default FilePicker;
