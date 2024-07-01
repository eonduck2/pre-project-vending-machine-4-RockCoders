import { Request, Response } from "express";
import path from 'path';
import __dirname from "../modules/__dirname.js";

export const admin = (req:Request, res:Response) => {
  return res.sendFile(path.join(__dirname, 'public/admin.html'));
}