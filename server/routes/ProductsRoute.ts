import { Router } from 'express';
import ProductsController from '../controller/ProductController';
import { csvMiddleware, upload } from '../middleware/csvMiddleware';
import { csvValidCodes, csvValidKeys, csvValidValues } from '../middleware/csvValidation';

const ProductsRoute = Router();

const productsController = new ProductsController();

ProductsRoute.get('/', productsController.getProducts);

ProductsRoute.post(
  '/validate', 
  upload.single('file'),
  csvMiddleware,
  csvValidKeys,
  csvValidValues,
  csvValidCodes,
  productsController.validateProducts,
  );

ProductsRoute.put(
  '/update',
  upload.single('file'),
  csvMiddleware,
  csvValidKeys,
  csvValidValues,
  csvValidCodes,
  productsController.updateProducts,
  );

export default ProductsRoute;