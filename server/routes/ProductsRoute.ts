import { Router } from 'express';
import ProductsController from '../controller/ProductController';
import {csvMiddleware, upload} from '../middleware/csvMiddleware';

const ProductsRoute = Router();

const productsController = new ProductsController();

ProductsRoute.get('/', productsController.getProducts);

ProductsRoute.post('/validate', upload.single('file'), csvMiddleware, productsController.validateProducts);
ProductsRoute.put('/update', upload.single('file'), csvMiddleware, productsController.updateProducts);

export default ProductsRoute;