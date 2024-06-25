import sqlite3, { Database as SQLite3Database } from "sqlite3";
import fs from "node:fs";

// * sqlite3 객체와 같은 기능을 하지만, 디버깅에 더 유리한 옵션을 포함한 verbose mode로 선언
const sqlite3VM = sqlite3.verbose();

interface ColumnDefinition {
  [key: string]: string;
}

interface Record {
  [key: string]: string | number | boolean | null;
}

interface UpdateData {
  [key: string]: string | number | boolean | null;
}

export class BaseDataBaseManager {
  db: SQLite3Database;
  fileWithPath: string;

  /**
   * @eonduck2 24.06.21
   * * 인자로 받은 경로에 존재하는 DB 파일을 연결(존재하지 않을 시 생성)
   * @param { string } fileWithPath 문자열 타입의 경로(eg: src/test.db)
   */
  constructor(fileWithPath: string) {
    this.fileWithPath = fileWithPath;
    this.db = new sqlite3VM.Database(fileWithPath, (err: Error | null) => {
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
  createTable(tableName: string, columns: ColumnDefinition) {
    const columnsDefinition = Object.entries(columns)
      .map(([name, type]) => `${name} ${type}`)
      .join(", ");

    const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnsDefinition})`;
    this.db.run(sql, (err: Error | null) => {
      if (err) {
        throw new Error(`테이블 생성 오류 (${tableName})`);
      } else {
        console.log(`테이블 "${tableName}" 생성 완료`);
      }
    });
  }

  /**
   * @eonduck2 24.06.21
   * * 인자로 받은 테이블로, 데이터 삽입
   * @param { string } tableName 삽입시킬 테이블 이름
   * @param { object } record
   * 객체 형태 ( 예시 - {name:'lee', age: 30})
   */
  createRecord(tableName: string, record: Record) {
    const columns = Object.keys(record).join(", ");
    const placeholders = Object.keys(record)
      .map(() => "?")
      .join(", ");
    const values = Object.values(record);
    const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;

    this.db.run(sql, values, (err: Error | null) => {
      if (err) {
        throw new Error(`데이터 삽입(insert) 에러: ${err.message}`);
      } else {
        console.log(`"${tableName}" 테이블에 데이터 삽입 성공`);
      }
    });
  }

  /**
   * @eonduck2 24.06.21
   * * 테이블과 컬럼명, 해당 컬럼 내의 값으로 데이터를 조회
   * @param { string } tableName 조회할 테이블
   * @param { string | number } column 조회할 테이블의 컬럼
   * @param { string | number } value 조회할 테이블의 컬럼의 값
   * @param { boolean } log true 값으로 보낼 시, 데이터 리턴과 동시에 console에 logging
   * @returns { Promise } 특정 컬럼의 데이터가 포함된 Promise
   */
  readRecord(
    tableName: string,
    column: string | number,
    value: string | number,
    log: boolean = false
  ): Promise<any[]> {
    const sql = `SELECT * FROM ${tableName} WHERE ${column} = ?`;
    return new Promise((resolve, reject) => {
      this.db.all(sql, [value], (err: Error | null, rows: any[]) => {
        if (err) {
          reject(new Error(`쿼리문 조회 에러: ${err.message}`));
        } else if (log) {
          console.log(rows);
          resolve(rows);
        } else {
          resolve(rows);
        }
      });
    });
  }

  /**
   * @eonduck2 24.06.21
   * * 테이블 이름으로 해당 테이블 내의 모든 데이터 조회
   * @param { string } tableName 전체 데이터를 조회할 테이블
   * @param { boolean } log true 값으로 보낼 시, 데이터 리턴과 동시에 console에 logging
   * @returns { Promise } 특정 테이블의 전체 데이터가 포함된 Promise
   */
  readRecordsAll(tableName: string, log: boolean): Promise<any[]> {
    const sql = `SELECT * FROM ${tableName}`;

    return new Promise((resolve, reject) => {
      this.db.all(sql, (err: Error | null, rows: any[]) => {
        if (err) {
          reject(new Error(`"${tableName}" 테이블 조회 실패: ${err.message}`));
        } else if (log) {
          console.log(rows);
          resolve(rows);
        } else {
          resolve(rows);
        }
      });
    });
  }

  /**
   * @eonduck2 24.06.22
   * * 특정 테이블에 접근하여 데이터 업데이트
   * @param { string } tableName 업데이트 지정 대상이 될 테이블 이름
   * @param { string | number } whereColumn 조건 지정을 위한 열의 이름
   * @param { string | number } whereValue 조건 지정을 위한 해당 컬럼 내의 값
   * @param { object } updateData 업데이트 시킬 데이터(컬럼)
   *
   * * 사용 예시 updateRecord(`테이블 이름`, `조건 컬럼`, `조건 값`, { 변경시킬 컬럼: "변경시킬 값" });
   */
  updateRecord(
    tableName: string,
    whereColumn: string | number,
    whereValue: string | number,
    updateData: UpdateData
  ) {
    const setClause = Object.keys(updateData)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = [...Object.values(updateData), whereValue];
    const sql = `UPDATE ${tableName} SET ${setClause} WHERE ${whereColumn} = ?`;

    this.db.run(sql, values, function (this: sqlite3.RunResult, err: Error | null) {
      if (err) {
        throw new Error(`컬럼 업데이트 에러: ${err.message}`);
      }
      if (this.changes === 0) {
        throw new Error(`업데이트 조건에 맞는 레코드가 없습니다.`);
      } else {
        console.log(`데이터 업데이트 완료`);
      }
    });
  }

  /**
   * @eonduck2 24.06.22
   * * 테이블 이름과 특정 조건식으로 테이블 내 특정 행 삭제
   * @param { string } tableName 데이터 삭제가 진행될 테이블
   * @param { string | number } whereColumn 조건 지정을 위한 열의 이름
   * @param { string | number } whereValue 조건 지정을 위한 해당 컬럼 내의 값
   */
  deleteRecord(tableName: string, whereColumn: string | number, whereValue: string | number) {
    const sql = `DELETE FROM ${tableName} WHERE ${whereColumn} = ?`;

    this.db.run(sql, [whereValue], (err: Error | null) => {
      if (err) {
        throw new Error(`데이터 딜리트 오류: ${err.message}`);
      } else {
        console.log(`데이터 딜리트 성공`);
      }
    });
  }

  /**
   * @eonduck2 24.06.22
   * * 특정 테이블의 모든 데이터 삭제
   * @param { string } tableName 모든 데이터를 삭제하기 위해 지정할 테이블
   */
  deleteRecordsAll(tableName: string) {
    const sql = `DELETE FROM ${tableName}`;

    this.db.run(sql, (err: Error | null) => {
      if (err) {
        throw new Error(`모든 데이터 삭제 중 오류 발생: ${err.message}`);
      } else {
        console.log(`"${tableName}" 테이블 내, 모든 데이터 삭제 완료`);
      }
    });
  }

  /**
   * @eonduck2 24.06.22
   * * 특정 테이블에 특정 컬럼을 추가하는 기능
   * @param { string } tableName 대상으로 지정되는 테이블
   * @param { string } columnName 추가될 컬럼 이름
   * @param { string } columnType 추가될 컬럼 타입 예 - (TEXT, INTEGER)
   */
  addColumn(tableName: string, columnName: string, columnType: string) {
    const sql = `ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnType}`;

    this.db.run(sql, (err: Error | null) => {
      if (err) {
        throw new Error(`컬럼 추가 중 에러 발생: ${err.message}`);
      } else {
        console.log(`"${tableName}" 테이블 내, 새로운 컬럼 "${columnName}" 추가 완료`);
      }
    });
  }

  /**
   * @eonduck2 24.06.23
   * * 특정 테이블을 드랍시키는 기능
   * @param { string } tableName 드랍시킬 테이블 이름
   */
  dropTable(tableName: string) {
    const sql = `DROP TABLE IF EXISTS ${tableName}`;

    this.db.run(sql, (err: Error | null) => {
      if (err) {
        throw new Error(`"${tableName}" 테이블 삭제 중 오류 발생: ${err.message}`);
      } else {
        console.log(`"${tableName}" 테이블 삭제 완료`);
      }
    });
  }

  /**
   * @eonduck2 24.06.22
   * * DB 연결 해제
   */
  closeConnection() {
    this.db.close((err: Error | null) => {
      if (err) {
        throw new Error(`DB 연결 해제 중 오류 발생: ${err.message}`);
      } else {
        console.log(`DB 연결 해제 성공`);
      }
    });
  }

  /**
   * @eonduck2 24.06.22
   * * DB 파일 삭제
   */
  deleteDatabaseFile() {
    fs.unlink(this.fileWithPath, (err: NodeJS.ErrnoException | null) => {
      if (err) {
        throw new Error(`DB 파일 삭제 중 오류 발생: ${err.message}`);
      } else {
        console.log(`DB 파일 삭제 완료`);
      }
    });
  }
}
