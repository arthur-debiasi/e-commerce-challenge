import { Request } from 'express';
import { Multer } from 'multer';

interface CsvData {
  product_code: number;
  new_price: string;
}

export default interface CustomRequest extends Request {
  csvData?: Multer
}
