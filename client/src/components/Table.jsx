import React, { useContext } from 'react';
import TableRow from './TableRow';
import AppContext from '../context/AppContext';

export default function Table() {
  const { products } = useContext(AppContext);
  return (
    <table>
      <thead>
        <tr>
          <th>Código</th>
          <th>Nome</th>
          <th>Preço de Custo</th>
          <th>Atual Preço de Venda</th>
          <th>Novo Preço de Venda</th>
          <th>Status Financeiro</th>
          <th>Status Marketing</th>
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
