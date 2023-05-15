import { Router } from 'express';
import ProductsController from '../controller/ProductController';
import {csvMiddleware, upload} from '../middleware/csvMiddleware';

const ProductsRouter = Router();

const productsController = new ProductsController();

ProductsRouter.get('/', productsController.getProducts);

ProductsRouter.post('/', upload.single('file'),csvMiddleware, productsController.postProduct);

export default ProductsRouter;