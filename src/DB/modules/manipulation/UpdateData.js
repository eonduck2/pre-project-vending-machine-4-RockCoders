import DBConnector from "../../DBConnector.js";

class AbstractUpdateData extends DBConnector {
  constructor(fileWithPath) {
    if (new.target === AbstractUpdateData) {
      throw new Error("AbstractUpdateData 클래스는 직접 인스턴스화 할 수 없음");
    }
    super(fileWithPath);
  }

  updateRecord(tableName, whereColumn, whereValue, updateData) {}
}

export default class UpdateData extends AbstractUpdateData {
  /**
   * @eonduck2 24.06.22
   * * 특정 테이블에 접근하여 데이터 업데이트
   * @param { string } tableName 업데이트 지정 대상이 될 테이블 이름
   * @param { string | number } whereColumn 조건 지정을 위한 열의 이름
   * @param { string | number } whereValue 조건 지정을 위한 해당 컬럼 내의 값
   * @param { object } updateData 업데이트 시킬 데이터(컬럼)
   *
   * * 사용 예시 updateRecord(`테이블 이름`, `조건 컬럼`, `조건 값`, { 변경시킬 컬럼: "변경시킬 값" });
   */
  updateRecord(tableName, whereColumn, whereValue, updateData) {
    const setClause = Object.keys(updateData)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = [...Object.values(updateData), whereValue];
    const sql = `UPDATE ${tableName} SET ${setClause} WHERE ${whereColumn} = ?`;

    this.db.run(sql, values, function (err) {
      if (err) {
        throw new Error(`컬럼 업데이트 에러`, err);
      }
      if (this.changes === 0) {
        throw new Error(`업데이트 조건에 맞는 레코드가 없습니다.`);
      } else {
        console.log(`데이터 업데이트 완료`);
      }
    });
  }
}
