import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
import axios from 'axios';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [products, setProducts] = useState([]);

  const handleFileChange = useCallback((event) => {
    setSelectedFile(event.target.files[0]);
  }, []);

  const handleUpload = useCallback(async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      const { data } = await axios.post('http://localhost:3001/products', formData);
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.error('Error uploading file: ', error);
    }
  }, [selectedFile]);

  const contextValue = useMemo(() => ({
    handleFileChange, handleUpload, selectedFile, products,
  }), [
    handleFileChange, handleUpload, selectedFile, products,
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
