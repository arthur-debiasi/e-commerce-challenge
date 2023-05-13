import { Pool, RowDataPacket } from 'mysql2/promise';
import connection from '../connection';

export default class ProductsModel {
  constructor(private conn: Pool = connection) {}

  public getProducts = async () => {
    const query = `SELECT * FROM ecommerce_db.products`;
    const [result] = await this.conn.execute<RowDataPacket[]>(query);
    return result
  };
}
