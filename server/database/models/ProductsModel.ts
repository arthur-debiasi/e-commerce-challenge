import { Pool, RowDataPacket } from 'mysql2/promise';
import connection from '../connection';
import { INewProduct, IProduct } from '../../interface/IProduct';
import { IPack } from '../../interface/IPack';

export default class ProductsModel {
  constructor(private conn: Pool = connection) {
    this.conn = conn;
  }

  public getProducts = async () => {
    const query = 'SELECT * FROM ecommerce_db.products';
    const [result] = await this.conn.execute(query);
    return result;
  };

  public getProductByCode = async (code: string) => {
    const query = 'SELECT * FROM ecommerce_db.products WHERE code = ?';
    const [[result]] = await this.conn.execute<RowDataPacket[]>(query, [code]);
    return result as IProduct;
  };

  public getPackByProductId = async (productId: string) => {
    const query = 'SELECT * FROM ecommerce_db.packs WHERE product_id = ?';
    const [[result]] = await this.conn.execute<RowDataPacket[]>(query, [productId]);
    return result as IPack;
  }

  public getPacksByPackId = async (packId: string) => {
    const query = 'SELECT * FROM ecommerce_db.packs WHERE pack_id = ?';
    const [result] = await this.conn.execute<RowDataPacket[]>(query, [packId]);
    return result as IPack[];
  }

  public updateProductPrice = async (newPrice: string, code: string) => {
    const query = 'UPDATE ecommerce_db.products SET sales_price = ? WHERE code = ?';
    await this.conn.execute<RowDataPacket[]>(query, [newPrice, code]);
  }

  public updatePackPrice = async (newPrice: string, code: string) => {
    const query = 'UPDATE ecommerce_db.products SET sales_price = ? WHERE code = ?';
    const [result] = await this.conn.execute<RowDataPacket[]>(query, [newPrice, code]);
    return result;
  }

  public updateProduct = async (newPrice: string, productCode: string) => {
    const pack = await this.getPackByProductId(productCode);
    let price = newPrice; let code = productCode;
    await this.updateProductPrice(price, code);
    if (pack) {
      const packs = await this.getPacksByPackId(pack.pack_id);
      const packPrice = await packs.reduce(async (accPromise, { product_id: productId, qty }) => {
        const acc = await accPromise;
        const { sales_price: salesPrice } = await this.getProductByCode(productId);
        return acc + Number(salesPrice) * Number(qty);
      }, Promise.resolve(0));
      price = packPrice.toString();
      code = pack.pack_id;
        await this.updateProductPrice(price, code);
    }
  };

  public update = async (products: INewProduct[]) => {
    const result = Promise.all(
      products.map(
        ({ product_code: code, new_price: price }) => this.updateProduct(price, code),
      ),
    );
    return result;
  }
}
