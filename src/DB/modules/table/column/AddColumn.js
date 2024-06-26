import DBConnector from "../../../DBConnector.js";

class AbstractAddColumn extends DBConnector {
  constructor(fileWithPath) {
    if (new.target === AbstractAddColumn) {
      throw new Error("AbstractAddColumn 클래스는 직접 인스턴스화 할 수 없음");
    }
    super(fileWithPath);
  }

  addColumn(tableName, columnName, columnType) {}
}

export default class AddColumn extends AbstractAddColumn {
  /**
   * @eonduck2 24.06.22
   * * 특정 테이블에 특정 컬럼을 추가하는 기능
   * @param { string } tableName 대상으로 지정되는 테이블
   * @param { string | number } columnName 추가될 컬럼 이름
   * @param { string } columnType 추가될 컬럼 타입 예 - (TEXT, INTEGER)
   */
  addColumn(tableName, columnName, columnType) {
    const sql = `ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnType}`;

    this.db.run(sql, (err) => {
      if (err) {
        throw new Error(
          `"${tableName}" 테이블에 "${columnName}" 컬럼 추가 에러`
        );
      } else {
        console.log(`"${tableName}" 테이블에 "${columnName}" 컬럼 추가 성공`);
      }
    });
  }
}
