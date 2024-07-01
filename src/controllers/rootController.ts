// * request, response 모듈   
import path from 'path';
import { Request, Response } from 'express';
import __dirname from '../modules/__dirname.js';

export const home = ((req: Request, res:Response) => {
  return res.sendFile(path.join(__dirname, "public/index.html"));
});