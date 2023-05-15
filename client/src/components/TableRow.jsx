import PropTypes from 'prop-types';
import React from 'react';

export default function TableRow(
  { product: {
    code, productName, costPrice, salesPrice, newPrice, finErr, mktErr,
  } },
) {
  return (
    <tr>
      <td>{code}</td>
      <td>{productName}</td>
      <td>{costPrice}</td>
      <td>{salesPrice}</td>
      <td>{newPrice}</td>
      <td>{finErr}</td>
      <td>{mktErr}</td>
    </tr>
  );
}

TableRow.propTypes = {
  new_price: PropTypes.string,
  product_code: PropTypes.string,
}.isRequired;
