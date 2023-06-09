import ProductsModel from '../database/models/ProductsModel';
import { INewProduct } from '../interface/IProduct';
import { financeValidation, marketingValidation } from './validation/newPriceValidation';

export default class ProductsService {
  private model: ProductsModel;

  constructor(model: ProductsModel = new ProductsModel()) {
    this.model = model;
  }

  public getProducts = async () => {
    const products = await this.model.getProducts();
    return products;
  };

  public validateProducts = async (newProducts: INewProduct[]) => {
    const result = await Promise.all(newProducts.map(async (newProduct) => {
      const { product_code: productCode, new_price: newPrice } = newProduct;
      const product = await this.model.getProductByCode(productCode);
      const { code, name: productName, cost_price: costPrice, sales_price: salesPrice } = product;
      const finErr = financeValidation(costPrice, newPrice);
      const mktErr = marketingValidation(salesPrice, newPrice);
      return { code, productName, costPrice, salesPrice, newPrice, finErr, mktErr };
    }));

    return result;
  }

  public updateProducts = async (newProducts: INewProduct[]) => {
    const result = await Promise.all(
      newProducts.map(
        async ({ product_code: productCode, new_price: newPrice }) => {
          await this.model.updateProduct(newPrice, productCode);
        },
      ),
    );
    return result;
  }
}
