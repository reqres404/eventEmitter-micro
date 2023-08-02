import React, { useState } from 'react';
import axios from 'axios';
import './uploadData.css';

const UploadData = () => {
  const [file, setFile] = useState(null);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadComplete(false); // Reset the upload completion status
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('uploadfile', file);

      await axios.post('http://localhost/api/upload/', formData);

      console.log('File imported successfully.');
      setFile(null)
      setUploadComplete(true); // Set the upload completion status
    } catch (error) {
      console.error('Error importing file:', error);
      // Handle the error or show an error message
    }
  };

  return (
    <div className="upload-container">
      <form className="upload-form" onSubmit={handleFormSubmit}>
        <input
          className="upload-label"
          type="file"
          name="uploadfile"
          onChange={handleFileChange}
        />
        {!uploadComplete && file !== null && (
          <button className="upload-button" type="submit">
            Upload
          </button>
        )}
        {uploadComplete && (
          <p className="upload-message">File uploaded successfully!</p>
        )}
      </form>
    </div>
  );
};

export default UploadData;