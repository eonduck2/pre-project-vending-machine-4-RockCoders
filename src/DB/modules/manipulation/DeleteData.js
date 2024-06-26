import DBConnector from "../../DBConnector.js";

class AbstractDeleteData {
  constructor(fileWithPath) {
    if (new.target === AbstractDeleteData) {
      throw new Error("AbstractDeleteData 클래스는 직접 인스턴스화 할 수 없음");
    }
    super(fileWithPath);
  }

  deleteRecord(tableName, whereColumn, whereValue) {}

  deleteRecordsAll(tableName) {}
}

export default class DeleteData extends AbstractDeleteData {
  /**
   * @eonduck2 24.06.22
   * * 테이블 이름과 특정 조건식으로 테이블 내 특정 행 삭제
   * @param { string } tableName 데이터 삭제가 진행될 테이블
   * @param { string | number } whereColumn 조건 지정을 위한 열의 이름
   * @param { string | number } whereValue 조건 지정을 위한 해당 컬럼 내의 값
   */
  deleteRecord(tableName, whereColumn, whereValue) {
    const sql = `DELETE FROM ${tableName} WHERE ${whereColumn} = ?`;

    this.db.run(sql, [whereValue], (err) => {
      if (err) {
        throw new Error(`데이터 딜리트 오류`);
      } else {
        console.log(`데이터 딜리트 성공`);
      }
    });
  }

  /**
   * @eonduck2 24.06.22
   * * 특정 테이블의 모든 데이터 삭제
   * @param { string } tableName 모든 데이터를 삭제하기 위해 지정할 테이블
   */
  deleteRecordsAll(tableName) {
    const sql = `DELETE FROM ${tableName}`;

    this.db.run(sql, (err) => {
      if (err) {
        throw new Error(`모든 데이터 삭제 중 오류 발생`);
      } else {
        console.log(`"${tableName}" 테이블 내, 모든 데이터 삭제 완료`);
      }
    });
  }
}
