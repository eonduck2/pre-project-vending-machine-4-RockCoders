import DBConnector from "../../DBConnector";
import instanceChecker from "../../instanceChecker";
import ITableCreator from "./TableCreator.inteface";

abstract class AbstractTableCreator
  extends DBConnector
  implements ITableCreator
{
  constructor(fileWithPath: string) {
    super(fileWithPath);
  }
  abstract createTable(tableName: string, columns: object): void;
}

export default class TableCreator extends AbstractTableCreator {
  constructor(fileWithPath: string) {
    instanceChecker(new.target, TableCreator);
    super(fileWithPath);
  }
  /**
   * @eonduck2 24.06.21
   * * 인자로 받은 테이블 이름과 컬럼들로 테이블 구성
   * @param { string } tableName 생성시킬 테이블 이름
   * @param { object } columns 컬럼 이름과 타입을 정의한 객체
   */
  createTable(tableName: string, columns: object): void {
    const columnsDefinition = Object.entries(columns)
      .map(([name, type]) => `${name} ${type}`)
      .join(", ");

    const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnsDefinition})`;
    this.db.run(sql, (err: Error) => {
      if (err) {
        throw new Error(`테이블 생성 오류 (${tableName})`);
      } else {
        console.log(`테이블 "${tableName}" 생성 완료`);
      }
    });
  }
}
