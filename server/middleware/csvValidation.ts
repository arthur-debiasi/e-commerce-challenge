import { NextFunction, Response } from 'express';
import CustomRequest from '../interface/CustomRequest';
import ProductsModel from '../database/models/ProductsModel';

const ERROR = 'Bad request.';
const csvValidKeys = (req:CustomRequest, res: Response, next: NextFunction) => {
  const invalidRows = req.csvData?.filter(
    (row) => !row.product_code || !row.new_price,
  );
  if (!invalidRows) return res.status(400).json({ error: ERROR });
  if (invalidRows.length > 0) {
    return res.status(400).json({ error: 'INVALID_KEYS' });
  }
  next();
};

const csvValidValues = (req:CustomRequest, res: Response, next: NextFunction) => {
  const invalidRows = req.csvData?.filter(
    (row) => {
      const productCode = Number(row.product_code);
      const newPrice = Number(row.new_price);
      return Number.isNaN(productCode) || Number.isNaN(newPrice);
    },
  );
  if (!invalidRows) return res.status(400).json({ error: ERROR });
  if (invalidRows.length > 0) {
    return res.status(400).json({ error: 'INVALID_VALUES' });
  }
  next();
};

const csvValidCodes = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const invalidRows: { product_code: any; }[] = [];
  
  if (!req.csvData) return res.status(400).json({ error: ERROR });
  await Promise.all(
    req.csvData?.map(async (row) => {
      const product = await new ProductsModel().getProductByCode(row.product_code);
      if (!product) {
        invalidRows.push(row);
      }
    }),
  );

  if (invalidRows.length > 0) {    
    return res
      .status(400)
      .json({ error: 'PRODUCT_NOT_FOUND', productCode: invalidRows[0].product_code });
  }
  
  next();
};

export { csvValidKeys, csvValidValues, csvValidCodes };