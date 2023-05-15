import express, { Request, Response } from 'express';
import ProductsRouter from './routes/ProductsRouter';
import cors from 'cors';
import { csvMiddleware, upload } from './middleware/csvMiddleware';


const app = express();

app.use(express.json());
app.use(cors())

app.use('/products', ProductsRouter)

export default app;