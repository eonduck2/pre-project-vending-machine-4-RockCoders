import sqlite3 from "sqlite3";

const sqlite3VM = sqlite3.verbose();

export default class DBManager {
  db;
  fileWithPath;
  /**
   * @eonduck2 24.06.21
   * * 인자로 받은 경로에 존재하는 DB 파일을 연결(존재하지 않을 시 생성)
   * @param { String } fileWithPath 문자열 타입의 경로(eg: src/test.db)
   */
  constructor(fileWithPath) {
    if (new.target === DBManager) {
      throw new Error("DBManager 클래스는 직접 인스턴스화 할 수 없음");
    }
    this.fileWithPath = fileWithPath;
    this.db = new sqlite3VM.Database(fileWithPath, (err) => {
      if (err) {
        throw new Error("DB 연결 실패");
      } else {
        console.log("DB 연결 성공");
      }
    });
  }

  static getDefaultConstants() {
    throw new Error("오버라이딩 된 메서드를 사용해야합니다.");
  }

  static generateConstraintString(properties) {
    throw new Error("오버라이딩 된 메서드를 사용해야합니다.");
  }

  createTable(tableName, columns) {
    throw new Error("오버라이딩 된 메서드를 사용해야합니다.");
  }

  createRecord(tableName, record) {
    throw new Error("오버라이딩 된 메서드를 사용해야합니다.");
  }

  readRecord(tableName, column, value, log = false) {
    throw new Error("오버라이딩 된 메서드를 사용해야합니다.");
  }

  readRecordsAll(tableName, log = false) {
    throw new Error("오버라이딩 된 메서드를 사용해야합니다.");
  }

  updateRecord(tableName, whereColumn, whereValue, updateData) {
    throw new Error("오버라이딩 된 메서드를 사용해야합니다.");
  }

  deleteRecord(tableName, whereColumn, whereValue) {
    throw new Error("오버라이딩 된 메서드를 사용해야합니다.");
  }

  deleteRecordsAll(tableName) {
    throw new Error("오버라이딩 된 메서드를 사용해야합니다.");
  }

  addColumn(tableName, columnName, columnType) {
    throw new Error("오버라이딩 된 메서드를 사용해야합니다.");
  }

  dropColumn(tableName, columnName) {
    throw new Error("오버라이딩 된 메서드를 사용해야합니다.");
  }

  beginTransaction(callback) {
    throw new Error("오버라이딩 된 메서드를 사용해야합니다.");
  }

  commit() {
    throw new Error("오버라이딩 된 메서드를 사용해야합니다.");
  }

  rollback() {
    throw new Error("오버라이딩 된 메서드를 사용해야합니다.");
  }

  getTableInfo(tableName, log = false) {
    throw new Error("오버라이딩 된 메서드를 사용해야합니다.");
  }

  backupDB(backupFilePath) {
    throw new Error("오버라이딩 된 메서드를 사용해야합니다.");
  }

  restoreDBFromBackup(backupDbFilePath, tableName) {
    throw new Error("오버라이딩 된 메서드를 사용해야합니다.");
  }

  getDBSize() {
    throw new Error("오버라이딩 된 메서드를 사용해야합니다.");
  }

  optimizeDB() {
    throw new Error("오버라이딩 된 메서드를 사용해야합니다.");
  }

  createIndex(indexName, tableName, column) {
    throw new Error("오버라이딩 된 메서드를 사용해야합니다.");
  }

  dropIndex(indexName) {
    throw new Error("오버라이딩 된 메서드를 사용해야합니다.");
  }

  getSomeIndexes(tableName, columnName) {
    throw new Error("오버라이딩 된 메서드를 사용해야합니다.");
  }

  getAllIndexes(tableName) {
    throw new Error("오버라이딩 된 메서드를 사용해야합니다.");
  }

  readRecordsAllByIndex(tableName, indexName, log = false) {
    throw new Error("오버라이딩 된 메서드를 사용해야합니다.");
  }

  reorderColumns(tableName, columns) {
    throw new Error("오버라이딩 된 메서드를 사용해야합니다.");
  }

  close() {
    throw new Error("오버라이딩 된 메서드를 사용해야합니다.");
  }
}
