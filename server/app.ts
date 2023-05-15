import express, { Request, Response } from 'express';
import ProductsModel from './database/models/ProductsModel';
import ProductsRouter from './routes/ProductsRouter';
import cors from 'cors';
import csvMiddleware from './middleware/csvMiddleware';
import multer, { FileFilterCallback, MulterError } from 'multer';


const app = express();

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
  if (file.mimetype === 'text/csv') {
    cb(null, true);
  } else {
    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'The file must be CSV'));
  }
};
const upload = multer({ fileFilter });

app.use(express.json());
app.use(cors())

app.use('/products', upload.single('file'), csvMiddleware, ProductsRouter)

export default app;