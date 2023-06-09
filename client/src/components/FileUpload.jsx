import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function FileUpload() {
  const {
    handleFileChange,
    handleUpload,
    handleUpdate,
    selectedFile,
    uploadErr,
    canUpdate,
    updateMsg,
  } = useContext(AppContext);
  return (
    <div>
      <input type="file" accept=".csv" onChange={ handleFileChange } />
      <button onClick={ handleUpload } disabled={ !selectedFile }>
        VALIDAR
      </button>
      <button onClick={ handleUpdate } disabled={ !canUpdate }>
        ATUALIZAR
      </button>
      <span>{uploadErr}</span>
      <span>{updateMsg}</span>
    </div>
  );
}

export default FileUpload;
