import { Request, Response, NextFunction } from 'express';
import csv from 'csvtojson';
import CustomRequest from '../interface/CustomRequest';
import multer, { FileFilterCallback, MulterError } from 'multer';
import ProductsModel from '../database/models/ProductsModel';

const csvMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Arquivo CSV não fornecido' });
  }

  try {
    const jsonArray = await csv().fromString(req.file.buffer.toString());
    let invalidRows = jsonArray.filter(
      (row) => !row.hasOwnProperty('product_code') || !row.hasOwnProperty('new_price')
    );
    if (invalidRows.length > 0) {
      return res.status(400).json({ error: 'INVALID_KEYS' });
    }
    invalidRows = jsonArray.filter(
      (row) => {
        const productCode = Number(row['product_code']);
        const newPrice = Number(row['new_price']);
        return isNaN(productCode) || isNaN(newPrice);
      }
    )
    if (invalidRows.length > 0) {
      return res.status(400).json({ error: 'INVALID_VALUES' });
    }

    invalidRows = jsonArray.filter((row) => {
      const productCode = Number(row['product_code']);
      const newPrice = Number(row['new_price']);
      return isNaN(productCode) || isNaN(newPrice);
    });

    if (invalidRows.length > 0) {
      return res.status(400).json({ error: 'INVALID_VALUES' });
    }

    for (const row of jsonArray) {
      const product = await new ProductsModel().getProductByCode(row.product_code);
      if (!product) {
        invalidRows.push(row);
      }
    }

    if (invalidRows.length > 0) {    
      return res.status(400).json({ error: 'PRODUCT_NOT_FOUND', product_code: invalidRows[0].product_code });
    }
    
    req.csvData = jsonArray;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao converter CSV para JSON' });
  }
};

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
  if (file.mimetype === 'text/csv') {
    cb(null, true);
  } else {
    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'The file must be CSV'));
  }
};
const upload = multer({ fileFilter });

export { upload, csvMiddleware };
