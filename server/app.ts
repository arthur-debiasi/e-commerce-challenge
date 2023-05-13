import express, { Request, Response } from 'express';
import ProductsModel from './database/models/ProductsModel';

const app = express();

app.use(express.json());

const productsModel = new ProductsModel()
app.get('/products', async (req: Request, res: Response) => {
  const products = await productsModel.getProducts();
  res.json(products);
  });


export default app;