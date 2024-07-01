import DBManager from "../../../DBMANAGER.js";
import instanceChecker from "../../../throw/instanceChecker.js";
import IAddColumn from "./AddColumn.interface";

abstract class AbstractAddColumn extends DBManager implements IAddColumn {
  constructor(fileWithPath: string) {
    super(fileWithPath);
  }

  public abstract addColumn(
    tableName: string,
    columnName: string | number,
    columnType: string
  ): void;
}

class ImplementedAddColumn extends AbstractAddColumn {
  constructor(fileWithPath: string) {
    instanceChecker(new.target, ImplementedAddColumn);
    super(fileWithPath);
  }
  /**
   * @eonduck2 24.06.22
   * * 특정 테이블에 특정 컬럼을 추가하는 기능
   * @param { string } tableName 대상으로 지정되는 테이블
   * @param { string | number } columnName 추가될 컬럼 이름
   * @param { string } columnType 추가될 컬럼 타입 예 - (TEXT, INTEGER)
   */
  public addColumn(
    tableName: string,
    columnName: string | number,
    columnType: string
  ) {
    const sql = `ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnType}`;

    this.db.run(sql, (err: Error) => {
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

export default class AddColumn extends ImplementedAddColumn {
  constructor(fileWithPath: string) {
    super(fileWithPath);
  }
}
