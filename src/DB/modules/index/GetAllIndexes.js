import DBConnector from "../../DBConnector.js";

class AbstractGetSomeIndexes extends DBConnector {
  constructor(fileWithPath) {
    if (new.target === AbstractGetSomeIndexes) {
      throw new Error(
        "AbstractGetSomeIndexes 클래스는 직접 인스턴스화 할 수 없음"
      );
    }
    super(fileWithPath);
  }

  getSomeIndexes(tableName, columnName) {}
}

export default class GetSomeIndexes extends AbstractGetSomeIndexes {
  /**
   * @eonduck2 24.06.23
   * * 특정 테이블 내 특정 컬럼의 인덱스를 조회
   * @param { string } tableName 인덱스 조회를 위해 지정할 테이블
   * @param { string | number } columnName 인덱스 조회 대상이 되는 컬럼
   */
  getSomeIndexes(tableName, columnName) {
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
                if (info.name === columnName) {
                  console.log(
                    `컬럼 이름: ${info.name}, 인덱스 시퀀스: ${index.seq}, 인덱스 이름: ${index.name} `
                  );
                }
              });
            }
          });
        });
      }
    });
  }
}
