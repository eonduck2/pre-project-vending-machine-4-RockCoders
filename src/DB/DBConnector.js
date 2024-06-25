import sqlite3 from "sqlite3";

const sqlite3VM = sqlite3.verbose();

export default class DBConnector {
  db;
  fileWithPath;
  /**
   * @eonduck2 24.06.21
   * * 인자로 받은 경로에 존재하는 DB 파일을 연결(존재하지 않을 시 생성)
   * @param { String } fileWithPath 문자열 타입의 경로(eg: src/test.db)
   */
  constructor(fileWithPath) {
    this.fileWithPath = fileWithPath;
    this.db = new sqlite3VM.Database(fileWithPath, (err) => {
      if (err) {
        throw new Error("DB 연결 실패");
      } else {
        console.log("DB 연결 성공");
      }
    });
  }

  /**
   * @eonduck2 24.06.21
   * * 인자로 받은 테이블 이름과 컬럼들로 테이블 구성
   * @param { string } tableName 생성시킬 테이블 이름
   * @param { object } columns 컬럼 이름과 타입을 정의한 객체
   */
  createTable(tableName, columns) {
    const columnsDefinition = Object.entries(columns)
      .map(([name, type]) => `${name} ${type}`)
      .join(", ");

    const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnsDefinition})`;
    this.db.run(sql, (err) => {
      if (err) {
        throw new Error(`테이블 생성 오류 (${tableName})`);
      } else {
        console.log(`테이블 "${tableName}" 생성 완료`);
      }
    });
  }
}
