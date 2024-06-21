import sqlite3 from "sqlite3";

// * sqlite3 객체와 같은 기능을 하지만, 디버깅에 더 유리한 옵션을 포함한 verbose mode로 선언
const sqlite3VM = sqlite3.verbose();

export default class DataBaseManager {
  db;
  /**
   * @eonduck2 24.06.21
   * * 인자로 받은 경로에 존재하는 DB 파일을 연결(존재하지 않을 시 생성)
   * @param {String} path 문자열 타입의 경로(eg: src/test.db)
   */
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
