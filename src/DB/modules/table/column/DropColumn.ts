import DBConnector from "../../../DBMANAGER";
import instanceChecker from "../../../throw/instanceChecker";
import IDropColumn from "./DropColumn.interface";

abstract class AbstractDropColumn extends DBConnector implements IDropColumn {
  constructor(fileWithPath: string) {
    super(fileWithPath);
  }

  abstract dropColumn(tableName: string, columnName: string | number): void;
}

class ImplementedDropColumn extends AbstractDropColumn {
  constructor(fileWithPath: string) {
    instanceChecker(new.target, ImplementedDropColumn);
    super(fileWithPath);
  }
  /**
   * @eonduck2 24.06.22
   * * 특정 테이블에 존재하는 특정 컬럼을 삭제하는 기능
   * @param { string } tableName 대상으로 지정되는 테이블
   * @param { string | number } columnName 삭제될 컬럼 이름
   */
  dropColumn(tableName: string, columnName: string | number) {
    const sql = `ALTER TABLE ${tableName} DROP COLUMN ${columnName}`;

    this.db.run(sql, (err: Error) => {
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

export default class DropColumn extends ImplementedDropColumn {
  constructor(fileWithPath: string) {
    super(fileWithPath);
  }
}
