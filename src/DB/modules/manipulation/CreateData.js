import DBConnector from "../../DBConnector.js";

class AbstractCreateData extends DBConnector {
  constructor(fileWithPath) {
    if (new.target === AbstractCreateData) {
      throw new Error("AbstractCreateData 클래스는 직접 인스턴스화 할 수 없음");
    }
    super(fileWithPath);
  }

  createRecord() {}
}

export default class CreateData extends AbstractCreateData {
  /**
   * @eonduck2 24.06.21
   * * 인자로 받은 테이블로, 데이터 삽입
   * @param { string } tableName 삽입시킬 테이블 이름
   * @param { object } record
   * 객체 형태 ( 예시 - {name:'lee', age: 30})
   */
  createRecord(tableName, record) {
    const columns = Object.keys(record).join(", ");
    const placeholders = Object.keys(record)
      .map(() => "?")
      .join(", ");
    const values = Object.values(record);
    const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;

    this.db.run(sql, values, (err) => {
      if (err) {
        throw new Error(`데이터 삽입(insert) 에러`, err);
      } else {
        console.log(`"${tableName}" 테이블에 데이터 삽입 성공`);
      }
    });
  }
}
