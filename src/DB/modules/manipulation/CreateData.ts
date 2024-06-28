import DBConnector from "../../DBMANAGER";
import instanceChecker from "../../throw/instanceChecker";
import ICreateData from "./CreateData.interface";

abstract class AbstractCreateData extends DBConnector implements ICreateData {
  constructor(fileWithPath: string) {
    super(fileWithPath);
  }
  abstract createRecord(tableName: string, record: object): void;
}

class ImplementedCreateData extends AbstractCreateData {
  constructor(fileWithPath: string) {
    instanceChecker(new.target, ImplementedCreateData);
    super(fileWithPath);
  }
  /**
   * @eonduck2 24.06.21
   * * 인자로 받은 테이블로, 데이터 삽입
   * @param { string } tableName 삽입시킬 테이블 이름
   * @param { object } record
   * 객체 형태 ( 예시 - {name:'lee', age: 30})
   */
  createRecord(tableName: string, record: object) {
    const columns = Object.keys(record).join(", ");
    const placeholders = Object.keys(record)
      .map(() => "?")
      .join(", ");
    const values = Object.values(record);
    const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;

    this.db.run(sql, values, (err: Error) => {
      if (err) {
        throw new Error(`데이터 삽입(insert) 에러`);
      } else {
        console.log(`"${tableName}" 테이블에 데이터 삽입 성공`);
      }
    });
  }
}

export default class CreateData extends ImplementedCreateData {
  constructor(fileWithPath: string) {
    super(fileWithPath);
  }
}
