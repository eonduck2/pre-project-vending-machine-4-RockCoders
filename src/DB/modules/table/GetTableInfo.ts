import DBManager from "../../DBMANAGER";
import instanceChecker from "../../throw/instanceChecker";
import IGetTableInfo from "./GetTableInfo.interface";

abstract class AbstractGetTableInfo extends DBManager implements IGetTableInfo {
  constructor(fileWithPath: string) {
    super(fileWithPath);
  }
  abstract getTableInfo(
    tableName: string,
    log: boolean
  ): Promise<Array<object>>;
}

class ImplementedGetTableInfo extends AbstractGetTableInfo {
  constructor(fileWithPath: string) {
    instanceChecker(new.target, ImplementedGetTableInfo);
    super(fileWithPath);
  }
  /**
   * @eonduck2 24.06.22
   * * 테이블에 관련된 정보를 조회
   * @param { string } tableName 대상이 될 테이블
   * @param { boolean } log true 값으로 보낼 시, 데이터 리턴과 동시에 console에 logging
   * @returns { promise } 특정 테이블 정보가 포함된 Promise
   */
  getTableInfo(tableName: string, log = false): Promise<Array<object>> {
    const sql = `PRAGMA table_info(${tableName})`;

    return new Promise((resolve, reject) => {
      this.db.all(sql, (err: Error, rows: Array<object>) => {
        if (err) {
          throw new Error(`"${tableName}" 테이블 정보 조회 에러`);
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

export default class TableCreator extends ImplementedGetTableInfo {
  constructor(fileWithPath: string) {
    super(fileWithPath);
  }
}
