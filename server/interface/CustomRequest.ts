import { Request } from 'express';
import { INewProduct } from './IProduct';

export default interface CustomRequest extends Request {
  csvData?: INewProduct[],
}
