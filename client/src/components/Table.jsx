import React, { useContext } from 'react';
import TableRow from './TableRow';
import AppContext from '../context/AppContext';

export default function Table() {
  const { products } = useContext(AppContext);
  return (
    <table>
      <thead>
        <tr>
          <th>Código do produto</th>
          <th>Preço Atual</th>
          <th>Novo Preço</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        { products.map((product, index) => (
          <TableRow key={ `product-${index + 1}` } product={ product } />
        ))}
      </tbody>
    </table>
  );
}
