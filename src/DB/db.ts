import path from 'path';
import { BaseDataBaseManager } from "./modules/DBMANAGER";

// *데이터베이스 경로
const dbPath:string = path.join(__dirname, 'src/product.db');

// * 데이터베이스 관리자 객체 생성
const dbManager = new BaseDataBaseManager(dbPath);

export default dbManager;