import { Request, Response } from 'express';
import ProductsService from '../service/ProductsService';
import CustomRequest from '../interface/CustomRequest';

export default class ProductsController {
  constructor(private service: ProductsService = new ProductsService()) { }

  public getProducts = async (_req: Request, res: Response) => {
    const products = await this.service.getProducts();
    res.status(200).json(products);
  };

  public postProduct = async (req: CustomRequest, res: Response) => {
    const { csvData } = req;
    console.log(csvData);
    
    res.status(200).json(csvData);
  };
}
