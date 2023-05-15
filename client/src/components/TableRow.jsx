import PropTypes from 'prop-types';
import React from 'react';

export default function TableRow(
  { product: { product_code: productCode, new_price: newPrice } },
) {
  return (
    <tr>
      <td>{productCode}</td>
      <td>R$ 100,00</td>
      <td>{newPrice}</td>
      <td>Em oferta</td>
    </tr>
  );
}

TableRow.propTypes = {
  new_price: PropTypes.string,
  product_code: PropTypes.string,
}.isRequired;
