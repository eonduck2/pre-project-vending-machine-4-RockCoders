import { Request, Response } from "express";
import path from 'path';
import __dirname from "../modules/__dirname.js";
import { formData } from "../modules/interface/formData.js";
import dbPath from "../DB/db.js";
import CreateData from "../DB/modules/manipulation/insert/CreateData.js";
import UpdateData from "../DB/modules/manipulation/update/UpdateData.js";
import DeleteData from "../DB/modules/manipulation/delete/DeleteData.js";

// * 관리자 페이지
export const admin = (req:Request, res:Response) => {
  return res.sendFile(path.join(__dirname, 'public/admin.html'));
}

// * 제품 추가
export const createDB = (req:Request, res:Response) => {
  const { name, price } = req.body as formData;
  const createProduct = new CreateData(dbPath);
  createProduct.createRecord('products', {
    name:name,
    price:price
  });
  createProduct.close();
  return res.redirect('/admin');
}

// * 제품 수정
export const updateDB = (req:Request, res:Response) => {
  const { id, name, price } = req.body as formData;
  const updateProduct = new UpdateData(dbPath);
  updateProduct.updateRecord('products', 'id', id, {
    name:name,
    price:price
  })
  updateProduct.close();
  return res.redirect('/admin');
}

// * 제품 삭제
export const deleteDB = (req:Request, res:Response) => {
  const { id } = req.body;
  const deleteProduct = new DeleteData(dbPath);
  deleteProduct.deleteRecord('products', 'id', id);
  deleteProduct.close();
  return res.redirect('/admin');
}