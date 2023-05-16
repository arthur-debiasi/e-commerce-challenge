import express from 'express';
import cors from 'cors';
import ProductsRoute from './routes/ProductsRoute';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/products', ProductsRoute);

export default app;