import { Request, Response, NextFunction } from 'express';
import csv from 'csvtojson';
import CustomRequest from '../interface/CustomRequest';

const csvMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Arquivo CSV não fornecido' });
  }

  try {
    const jsonArray = await csv().fromString(req.file.buffer.toString());
    (req as any).csvData = jsonArray;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao converter CSV para JSON' });
  }
};
export default csvMiddleware;
