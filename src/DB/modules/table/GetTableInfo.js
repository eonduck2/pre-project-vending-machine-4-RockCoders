import DBConnector from "../../DBConnector.js";

class AbstractGetTableInfo extends DBConnector {
  constructor(fileWithPath) {
    if (new.target === AbstractGetTableInfo) {
      throw new Error(
        "AbstractGetTableInfo 클래스는 직접 인스턴스화 할 수 없음"
      );
    }
    super(fileWithPath);
  }

  getTableInfo(tableName, log = false) {}
}

export default class GetTableInfo extends AbstractGetTableInfo {
  /**
   * @eonduck2 24.06.22
   * * 테이블에 관련된 정보를 조회
   * @param { string } tableName 대상이 될 테이블
   * @param { boolean } log true 값으로 보낼 시, 데이터 리턴과 동시에 console에 logging
   * @returns { promise } 특정 테이블 정보가 포함된 Promise
   */
  getTableInfo(tableName, log = false) {
    const sql = `PRAGMA table_info(${tableName})`;

    return new Promise((resolve, reject) => {
      this.db.all(sql, (err, rows) => {
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
