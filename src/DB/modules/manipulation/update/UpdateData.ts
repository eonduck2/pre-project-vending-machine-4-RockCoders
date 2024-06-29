import DBManager from "../../../DBMANAGER";
import instanceChecker from "../../../throw/instanceChecker";
import IUpdateData from "./UpdateData.interface";

abstract class AbstractUpdateData extends DBManager implements IUpdateData {
  constructor(fileWithPath: string) {
    super(fileWithPath);
  }
  abstract updateRecord(
    tableName: string,
    whereColumn: string | number,
    whereValue: string | number,
    updateData: object
  ): void;
}

class ImplementedUpdateData extends AbstractUpdateData {
  constructor(fileWithPath: string) {
    instanceChecker(new.target, ImplementedUpdateData);
    super(fileWithPath);
  }
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
  updateRecord(
    tableName: string,
    whereColumn: string | number,
    whereValue: string | number,
    updateData: object
  ) {
    const setClause = Object.keys(updateData)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = [...Object.values(updateData), whereValue];
    const sql = `UPDATE ${tableName} SET ${setClause} WHERE ${whereColumn} = ?`;

    this.db.run(sql, values, function (this: any, err: Error) {
      if (err) {
        throw new Error(`컬럼 업데이트 에러`);
      }
      if (this.changes === 0) {
        throw new Error(`업데이트 조건에 맞는 레코드가 없습니다.`);
      } else {
        console.log(`데이터 업데이트 완료`);
      }
    });
  }
}

export default class UpdateData extends ImplementedUpdateData {
  constructor(fileWithPath: string) {
    super(fileWithPath);
  }
}
