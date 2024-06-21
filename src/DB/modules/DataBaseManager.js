import sqlite3 from "sqlite3";

// * sqlite3 객체와 같은 기능을 하지만, 디버깅에 더 유리한 옵션을 포함한 verbose mode로 선언
const sqlite3VM = sqlite3.verbose();

export default class DataBaseManager {
  db;
  constructor(path) {
    this.db = new sqlite3.Database(path, (err) => {
      if (err) {
        console.error("DB 연결 실패: ", err);
      } else {
        console.log("DB 연결 성공");
      }
    });
  }

  static tableCreator() {}

  createRecord() {}
  readRecord() {}
  updateRecord() {}
  deleteRecord() {}
  close() {}
}
