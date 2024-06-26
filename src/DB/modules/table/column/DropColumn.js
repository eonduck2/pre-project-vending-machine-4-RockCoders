import DBConnector from "../../../DBConnector.js";

class AbstractDropColumn extends DBConnector {
  constructor(fileWithPath) {
    if (new.target === AbstractDropColumn) {
      throw new Error("AbstractDropColumn 클래스는 직접 인스턴스화 할 수 없음");
    }
    super(fileWithPath);
  }

  dropColumn(tableName, columnName) {}
}

export default class DropColumn extends AbstractDropColumn {
  /**
   * @eonduck2 24.06.22
   * * 특정 테이블에 존재하는 특정 컬럼을 삭제하는 기능
   * @param { string } tableName 대상으로 지정되는 테이블
   * @param { string | number } columnName 삭제될 컬럼 이름
   */
  dropColumn(tableName, columnName) {
    const sql = `ALTER TABLE ${tableName} DROP COLUMN ${columnName}`;

    this.db.run(sql, (err) => {
      if (err) {
        throw new Error(
          `"${tableName}" 테이블에서의 "${columnName}" 컬럼 삭제 에러`
        );
      } else {
        console.log(`"${tableName}" 테이블의 "${columnName}" 컬럼 삭제 완료`);
      }
    });
  }
}
