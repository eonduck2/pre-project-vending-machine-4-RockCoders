import DBConnector from "../../../DBMANAGER";
import instanceChecker from "../../../throw/instanceChecker";
import IReadData from "./ReadData.interface";

abstract class AbstractReadData extends DBConnector implements IReadData {
  constructor(fileWithPath: string) {
    super(fileWithPath);
  }

  abstract readRecord(
    tableName: string,
    column: string | number,
    value: string | number,
    log?: boolean
  ): Promise<Array<object>>;

  abstract readRecordsAll(
    tableName: string,
    log?: boolean
  ): Promise<Array<object>>;

  abstract readRecordsAllByIndex(
    tableName: string,
    indexName: string,
    log?: boolean
  ): Promise<Array<object>>;
}

class ImplementedReadData extends AbstractReadData {
  constructor(fileWithPath: string) {
    instanceChecker(new.target, ImplementedReadData);
    super(fileWithPath);
  }
  /**
   * @eonduck2 24.06.21
   * * 테이블과 컬럼명, 해당 컬럼 내의 값으로 데이터를 조회
   * @param { string } tableName 조회할 테이블
   * @param { string | number } column 조회할 테이블의 컬럼
   * @param { string | number } value 조회할 테이블의 컬럼의 값
   * @param { boolean } log true 값으로 보낼 시, 데이터 리턴과 동시에 console에 logging
   * @returns { promise } 특정 컬럼의 데이터가 포함된 Promise
   */
  readRecord(
    tableName: string,
    column: string | number,
    value: string | number,
    log = false
  ): Promise<Array<object>> {
    const sql = `SELECT * FROM ${tableName} WHERE ${column} = ?`;
    return new Promise((resolve, reject) => {
      this.db.all(sql, [value], (err: Error, rows: Array<object>) => {
        if (err) {
          throw new Error(`쿼리문 조회 에러`);
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
   * @returns { promise } 특정 테이블의 전체 데이터가 포함된 Promise
   */
  readRecordsAll(tableName: string, log = false): Promise<Array<object>> {
    const sql = `SELECT * FROM ${tableName}`;

    return new Promise((resolve, reject) => {
      this.db.all(sql, (err: Error, rows: Array<object>) => {
        if (err) {
          throw new Error(`"${tableName}" 테이블 조회 실패`);
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
   * @eonduck2 24.06.23
   * * 특정 인덱스를 사용하여 데이터 전체 조회
   * @param { string } tableName 테이블 이름
   * @param { string } indexName 인덱스 이름
   * @param { boolean } log true 값으로 보낼 시, 데이터 리턴과 동시에 console에 logging
   * @returns { promise } 특정 테이블의 전체 데이터가 포함된 Promise
   */
  readRecordsAllByIndex(
    tableName: string,
    indexName: string,
    log = false
  ): Promise<Array<object>> {
    const sql = `SELECT * FROM ${tableName} INDEXED BY ${indexName}`;

    return new Promise((resolve, reject) => {
      this.db.all(sql, (err: Error, rows: Array<object>) => {
        if (err) {
          throw new Error(`인덱스를 이용한 데이터 조회 오류`);
        } else if (log) {
          console.log(rows);
          resolve(rows);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

export default class ReadData extends ImplementedReadData {
  constructor(fileWithPath: string) {
    super(fileWithPath);
  }
}
