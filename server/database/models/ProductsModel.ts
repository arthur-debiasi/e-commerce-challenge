import { Pool, RowDataPacket } from 'mysql2/promise';
import connection from '../connection';
import { IProduct } from '../../interface/IProduct';

export default class ProductsModel {
  constructor(private conn: Pool = connection) { }

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

  public getPacksByPackId = async (packId:string) => {
    const query = 'SELECT * FROM ecommerce_db.packs WHERE pack_id = ?';
    const [result] = await this.conn.execute(query, [packId]);
    return result;
  }

  public changeProductPrice = async (newPrice:string, code: string) => {
    const query = 'UPDATE ecommerce_db.products SET sales_price = ? WHERE code = ?';
    const [result] = await this.conn.execute<RowDataPacket[]>(query, [newPrice, code]);
    return result;
  }
}
