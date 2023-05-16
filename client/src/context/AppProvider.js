import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
import axios from 'axios';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [products, setProducts] = useState([]);
  const [uploadErr, setUploadErr] = useState('');
  const [updateMsg, setUpdateMsg] = useState('');
  const [canUpdate, setCanUpdate] = useState(false);

  const handleFileChange = useCallback((event) => {
    setCanUpdate(false);
    setSelectedFile(event.target.files[0]);
  }, []);

  const handleUpload = useCallback(async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      const { data } = await axios.post('http://localhost:3001/products/validate', formData);
      setUploadErr('');
      setUpdateMsg('');
      setProducts(data);
      const shouldUpdate = data.every(({ finErr, mktErr }) => {
        return finErr === 'OK' && mktErr === 'OK';
      });
      setCanUpdate(shouldUpdate);
    } catch (error) {
      if (error.response) {
        console.error('Error uploading file:', error.response.status);
        if (error.response.data.error === 'INVALID_KEYS') {
          console.error('O arquivo CSV contém chaves inválidas.');
          setProducts([]);
          setUploadErr('O arquivo CSV contém chaves inválidas.');
          setCanUpdate(false);
        } else if (error.response.data.error === 'INVALID_VALUES') {
          console.error('O arquivo CSV contém valores não-numéricos.');
          setProducts([]);
          setUploadErr('O arquivo CSV contém valores não-numéricos.');
          setCanUpdate(false);
        } else if (error.response.data.error === 'PRODUCT_NOT_FOUND') {
          const code = error.response.data.productCode;
          console.error(`O produto de código ${code} não foi encontrado.`);
          setProducts([]);
          setUploadErr(`O produto de código ${code} não foi encontrado.`);
          setCanUpdate(false);
        }
      } else {
        console.error('Error updating file:', error.message);
      }
    }
  }, [selectedFile]);

  const handleUpdate = useCallback(async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      await axios.put('http://localhost:3001/products/update', formData);
      setUpdateMsg('Produto(s) atualizados com sucesso!');
      setProducts([]);
      setCanUpdate(false);
    } catch (error) {
      console.error('Error uploading file:', error.response.status);
    }
  }, [selectedFile]);
  const contextValue = useMemo(() => ({
    handleFileChange,
    handleUpload,
    handleUpdate,
    selectedFile,
    products,
    uploadErr,
    canUpdate,
    updateMsg,
  }), [
    handleFileChange,
    handleUpload,
    handleUpdate,
    selectedFile,
    products,
    uploadErr,
    canUpdate,
    updateMsg,
  ]);
  return (
    <AppContext.Provider
      value={ contextValue }
    >
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.element,
}.isRequired;
