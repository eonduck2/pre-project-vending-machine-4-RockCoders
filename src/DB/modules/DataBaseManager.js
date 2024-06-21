import sqlite3 from "sqlite3";

// * sqlite3 객체와 같은 기능을 하지만, 디버깅에 더 유리한 옵션을 포함한 verbose mode로 선언
const sqlite3VM = sqlite3.verbose();

export default class DataBaseManager {
  db;
  /**
   * @eonduck2 24.06.21
   * * 인자로 받은 경로에 존재하는 DB 파일을 연결(존재하지 않을 시 생성)
   * @param { String } path 문자열 타입의 경로(eg: src/test.db)
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
   * @param { string } tableName 생성시킬 테이블 이름
   * @param { array } columns
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
   * @param { string } tableName 삽입시킬 테이블 이름
   * @param { object } record
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

  /**
   * @eonduck2 24.06.21
   * * 테이블과 컬럼명, 해당 컬럼 내의 값으로 데이터를 조회
   * @param { string } tableName 조회할 테이블
   * @param { string } column 조회할 테이블의 컬럼
   * @param { string } value 조회할 테이블의 컬럼의 값
   * @param { boolean } log true 값으로 보낼 시, console에 logging.
   * @returns 특정 컬럼의 데이터가 포함된 Promise
   */
  readRecord(tableName, column, value, log = false) {
    const sql = `SELECT * FROM ${tableName} WHERE ${column} = ?`;
    return new Promise((resolve, reject) => {
      this.db.all(sql, [value], (err, rows) => {
        if (err) {
          throw new Error(`쿼리문 조회 에러`, err);
        } else if (log === true) {
          console.log(rows);
          resolve(rows);
        } else {
          resolve(rows);
        }
      });
    });
  }

  updateRecord() {}
  deleteRecord() {}

  /**
   * @eonduck2 24.06.21
   * * 테이블 이름으로 해당 테이블 내의 모든 데이터 조회
   * @param { string } tableName 전체 데이터를 조회할 테이블
   * @param { boolean } log true 값으로 보낼 시, console에 logging.
   * @returns 특정 테이블의 전체 데이터가 포함된 Promise
   */
  getAllRecords(tableName, log) {
    const sql = `SELECT * FROM ${tableName}`;

    return new Promise((resolve, reject) => {
      this.db.all(sql, (err, rows) => {
        if (err) {
          throw new Error(`${tableName} 테이블 조회 실패`, err);
        } else if (log === true) {
          console.log(rows);
          resolve(rows);
        } else {
          resolve(rows);
        }
      });
    });
  }

  close() {}
}
