import { Router } from 'express';
import ProductsController from '../controller/ProductController';
import csvMiddleware from '../middleware/csvMiddleware';

const ProductsRouter = Router();

const productsController = new ProductsController();

ProductsRouter.get('/', productsController.getProducts);

ProductsRouter.post('/',csvMiddleware, productsController.postProduct);

export default ProductsRouter;