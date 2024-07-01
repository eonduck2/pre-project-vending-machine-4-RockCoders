import path from 'path';
// import { BaseDataBaseManager } from "./modules/DBMANAGER.js";
import __dirname from '../modules/__dirname.js';

// *데이터베이스 경로
const dbPath:string = path.join(__dirname, 'product.db');

// * 데이터베이스 관리자 객체 생성
// const dbManager = new BaseDataBaseManager(dbPath);

export default dbPath;