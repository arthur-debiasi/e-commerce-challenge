import { Request } from 'express';
import { INewProduct } from './IProduct';

interface CustomRequest extends Request {
  csvData?: INewProduct[],
}

export default CustomRequest;
