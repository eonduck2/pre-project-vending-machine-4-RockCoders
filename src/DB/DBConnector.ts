import sqlite3, { Database, verbose } from "sqlite3";
import IDBConnector from "./DBConnector.inteface";
import IDB from "./interfaces/Db.interface";
import IFileWithPath from "./interfaces/FileWithPath.interface";
import IDBCloser from "./interfaces/Close.inteface";

const sqlite3VM: typeof sqlite3 = verbose();

export default class DBConnector implements IDBConnector {
  db: IDB;
  fileWithPath: IFileWithPath;
  /**
   * @eonduck2 24.06.21
   * * 인자로 받은 경로에 존재하는 DB 파일을 연결(존재하지 않을 시 생성)
   * @param { String } fileWithPath 문자열 타입의 경로(eg: src/test.db)
   */
  constructor(fileWithPath: IFileWithPath) {
    this.db = new sqlite3VM();
    if (new.target === DBConnector) {
      throw new Error("DBManager 클래스는 직접 인스턴스화 할 수 없음");
    }
    this.fileWithPath = fileWithPath;
    this.db = new sqlite3VM.Database(fileWithPath, (err: Error) => {
      if (err) {
        throw new Error("DB 연결 실패");
      } else {
      }
    });
  }

  close(): IDBCloser {}

  //   /**
  //    * @eonduck2 24.06.22
  //    * * DB와의 연결 해제
  //    */
  //   close(): IDBCloser {
  //     this.db.close((err: Error) => {
  //       if (err) {
  //         throw new Error("DB 커넥션 close 오류");
  //       } else {
  //         console.log("DB 연결 해제");
  //       }
  //     });
  //   }
}
