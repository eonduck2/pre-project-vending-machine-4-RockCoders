// * request, response 모듈   
import path from 'path';
import { Request, Response } from 'express';
import __dirname from '../modules/__dirname.js';
import ReadData from '../DB/modules/manipulation/select/ReadData.js';
import dbPath from '../DB/db.js';
import CreateData from '../DB/modules/manipulation/insert/CreateData.js';
import { Product } from '../modules/interface/Product.js';

export const home = ((req: Request, res:Response) => {
  return res.sendFile(path.join(__dirname, "public/index.html"));
});

export const products = ((req:Request, res:Response) => {
  const readData = new ReadData(dbPath);
  readData.readRecordsAll('products', false)
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: 'Failed to fetch products' });
    });
  readData.close();
});

export const purchase = ((req:Request, res:Response) => {
  const products : Product[] = req.body.products;
  // * 배열이 아닌 경우 err
  if (!Array.isArray(products)) {
    return res.status(400).send('유효한 변수 타입이 아닙니다.');
  }
  products.forEach(product => {
    // * 각 레코드의 형식 변환
    const record: Record<string, string | number> = {
      name: product.name,
      price: product.price
    };
    // * history 테이블에 레코드 추가
    const createProduct = new CreateData(dbPath);
    createProduct.createRecord('history', record);
    createProduct.close();
    return res.redirect('/');
  });
})