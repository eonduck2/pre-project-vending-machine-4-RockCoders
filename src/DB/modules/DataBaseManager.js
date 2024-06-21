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
        throw new Error("DB 연결 실패: ", err);
      } else {
        console.log("DB 연결 성공");
      }
    });
  }

  /**
   * @eonduck2 24.06.21
   * * 인자로 받은 테이블 이름과 컬럼들로 테이블 구성
   * @param tableName 생성시킬 테이블 이름
   * @param columns
   * 배열 내부 객체 형태 ( 예시 - [{"name":"id", "type":"INTEGER PRIMARY KEY AUTOINCREMENT"}])
   */
  tableCreator(tableName, columns) {
    this.db.serialize(() => {
      const columnsDefinition = columns
        .map((column) => `${column.name} ${column.type}`)
        .join(", ");
      const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnsDefinition})`;
      this.db.run(sql, (err) => {
        if (err) {
          throw new Error(`테이블 생성 에러 (${tableName})`, err);
        } else {
          console.log(`${tableName} 테이블 생성 완료`);
        }
      });
    });
  }

  /**
   * @eonduck2 24.06.21
   * * 인자로 받은 테이블로, 데이터 삽입
   * @param tableName 생성시킬 테이블 이름
   * @param record
   * 객체 형태 ( 예시 - {name:'lee', test: "test"})
   */
  createRecord(tableName, record) {
    const columns = Object.keys(record).join(", ");
    const placeholders = Object.keys(record)
      .map(() => "?")
      .join(", ");
    const values = Object.values(record);
    const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;

    this.db.run(sql, values, (err) => {
      if (err) {
        throw new Error(`데이터 삽입(insert) 에러`, err);
      } else {
      }
    });
  }

  readRecord() {}
  updateRecord() {}
  deleteRecord() {}
  close() {}
}
