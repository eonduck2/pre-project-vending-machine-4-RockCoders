import DBConnector from "../../DBConnector.js";

class AbstractGetAllIndexes extends DBConnector {
  constructor(fileWithPath) {
    if (new.target === AbstractGetAllIndexes) {
      throw new Error(
        "AbstractGetAllIndexes 클래스는 직접 인스턴스화 할 수 없음"
      );
    }
    super(fileWithPath);
  }

  getAllIndexes(tableName) {}
}

export default class GetAllIndexes extends AbstractGetAllIndexes {
  /**
   * @eonduck2 24.06.23
   * * 특정 테이블의 모든 인덱스를 조회
   * @param { string } tableName 인덱스 조회 대상이 되는 테이블
   */
  getAllIndexes(tableName) {
    const sql = `PRAGMA index_list(${tableName})`;
    this.db.all(sql, (err, indexes) => {
      if (err) {
        throw new Error(`인덱스 리스트 조회 실패: ${err}`);
      } else {
        indexes.forEach((index) => {
          const indexInfoSql = `PRAGMA index_info(${index.name})`;
          this.db.all(indexInfoSql, (err, indexInfo) => {
            if (err) {
              throw new Error(`인덱스 정보 조회 실패: ${err}`);
            } else {
              indexInfo.forEach((info) => {
                console.log(`컬럼 이름: ${info.name}`, index);
              });
            }
          });
        });
      }
    });
  }
}
