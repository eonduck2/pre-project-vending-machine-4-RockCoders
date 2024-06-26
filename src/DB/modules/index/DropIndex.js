import DBConnector from "../../DBConnector.js";

class AbstractDropIndex extends DBConnector {
  constructor(fileWithPath) {
    if (new.target === AbstractDropIndex) {
      throw new Error("AbstractDropIndex 클래스는 직접 인스턴스화 할 수 없음");
    }
    super(fileWithPath);
  }

  DropIndex(indexName, tableName, column) {}
}

export default class DropIndex extends AbstractDropIndex {
  /**
   * @eonduck2 24.06.23
   * * 특정 인덱스를 삭제
   * @param { string } indexName 삭제할 인덱스의 이름
   */
  dropIndex(indexName) {
    const sql = `DROP INDEX IF EXISTS ${indexName}`;
    this.db.run(sql, (err) => {
      if (err) {
        throw new Error(`인덱스 삭제 에러`);
      } else {
        console.log(`"${indexName}" 인덱스 삭제 완료`);
      }
    });
  }
}
