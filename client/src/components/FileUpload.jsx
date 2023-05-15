import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function FileUpload() {
  const { handleFileChange, handleUpload, selectedFile } = useContext(AppContext);
  return (
    <div>
      <input type="file" accept=".csv" onChange={ handleFileChange } />
      <button onClick={ handleUpload } disabled={ !selectedFile }>
        Upload
      </button>
    </div>
  );
}

export default FileUpload;
