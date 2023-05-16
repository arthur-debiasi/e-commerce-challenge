import { Request, Response } from 'express';
import ProductsService from '../service/ProductsService';
import CustomRequest from '../interface/CustomRequest';

export default class ProductsController {
  constructor(private service: ProductsService = new ProductsService()) {
    this.service = service;
  }

  public getProducts = async (_req: Request, res: Response) => {
    const products = await this.service.getProducts();
    res.status(200).json(products);
  };

  public validateProducts = async (req: CustomRequest, res: Response) => {
    const { csvData } = req;
    if (csvData) {
      const result = await this.service.validateProducts(csvData);
      res.status(200).json(result);
    } else {
      res.status(500).json({ message: 'Bad request (csv file)' });
    }
  };

  public updateProducts = async (req: CustomRequest, res: Response) => {
    const { csvData } = req;
    if (csvData) {
      const result = await this.service.updateProducts(csvData);
      res.status(204).json(result);
  } else {
    res.status(500).json({ message: 'Bad request (csv file)' });
  }
}
}
