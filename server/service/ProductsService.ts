import ProductsModel from '../database/models/ProductsModel';

export default class ProductsService {
  private model: ProductsModel;

  constructor(model: ProductsModel = new ProductsModel()) {
    this.model = model;
  }

  public getProducts = async () => {
    const products = await this.model.getProducts();
    return products;
  };

}
