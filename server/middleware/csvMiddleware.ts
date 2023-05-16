import { Request, Response, NextFunction } from 'express';
import csv from 'csvtojson';
import multer, { FileFilterCallback, MulterError } from 'multer';
import CustomRequest from '../interface/CustomRequest';
import MulterFile from '../interface/MulterFile';

const csvMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Arquivo CSV não fornecido' });
  }

  try {
    const jsonArray = await csv().fromString(req.file.buffer.toString());
    req.csvData = jsonArray;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao converter CSV para JSON' });
  }
};

const fileFilter = (req: Request, file: MulterFile, cb: FileFilterCallback): void => {
  if (file.mimetype === 'text/csv') {
    cb(null, true);
  } else {
    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'The file must be CSV'));
  }
};
const upload = multer({ fileFilter });

export { upload, csvMiddleware };
