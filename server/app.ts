import express, { Request, Response } from 'express';
import ProductsModel from './database/models/ProductsModel';
import ProductsRouter from './routes/ProductsRouter';

const app = express();

app.use(express.json());

app.use('/products', ProductsRouter)

export default app;