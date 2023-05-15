import express, { Request, Response } from 'express';
import ProductsRoute from './routes/ProductsRoute';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors())

app.use('/products', ProductsRoute)

export default app;