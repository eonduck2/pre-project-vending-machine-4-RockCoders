import DBConnector from "../../DBConnector.js";

class AbstractCreateIndex extends DBConnector {
  constructor(fileWithPath) {
    if (new.target === AbstractCreateIndex) {
      throw new Error(
        "AbstractCreateIndex 클래스는 직접 인스턴스화 할 수 없음"
      );
    }
    super(fileWithPath);
  }

  createIndex(indexName, tableName, column) {}
}

export default class CreateIndex extends AbstractCreateIndex {
  /**
   * @eonduck2 24.06.23
   * * 특정 테이블의 특정 컬럼에 인덱스를 생성
   * @param { string } indexName 인덱스로 사용될 이름
   * @param { string } tableName 인덱스 생성을 위해 접근하는 테이블 이름
   * @param { string | number } column 인덱스를 생성시킬 컬럼 이름
   */
  createIndex(indexName, tableName, column) {
    const checkIndexSql = `PRAGMA index_list(${tableName})`;
    this.db.all(checkIndexSql, (err, indexes) => {
      if (err) {
        throw new Error(`인덱스 확인 오류: ${err.message}`);
      } else {
        const indexExists = indexes.some((index) => index.name === indexName);
        if (indexExists) {
          throw new Error(`인덱스 "${indexName}"가 이미 존재합니다`);
        } else {
          const createIndexSql = `CREATE INDEX ${indexName} ON ${tableName} (${column})`;
          this.db.run(createIndexSql, (err) => {
            if (err) {
              throw new Error(`컬럼 인덱스 생성 오류: ${err.message}`);
            } else {
              console.log(
                `"${tableName}" 테이블의 "${column}" 컬럼에 "${indexName}" 인덱스 생성 완료`
              );
            }
          });
        }
      }
    });
  }
}
