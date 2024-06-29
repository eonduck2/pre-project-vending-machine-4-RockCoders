import DBManager from "../../../DBMANAGER.js";
import instanceChecker from "../../../throw/instanceChecker.js";
import IDeleteData from "./DeleteData.interface";

abstract class AbstractDeleteData extends DBManager implements IDeleteData {
  constructor(fileWithPath: string) {
    super(fileWithPath);
  }
  public abstract deleteRecord(
    tableName: string,
    whereColumn: string | number,
    whereValue: string | number
  ): void;

  public abstract deleteRecordsAll(tableName: string): void;
}

class ImplementedDeleteData extends AbstractDeleteData {
  constructor(fileWithPath: string) {
    instanceChecker(new.target, ImplementedDeleteData);
    super(fileWithPath);
  }

  /**
   * @eonduck2 24.06.22
   * * 테이블 이름과 특정 조건식으로 테이블 내 특정 행 삭제
   * @param { string } tableName 데이터 삭제가 진행될 테이블
   * @param { string | number } whereColumn 조건 지정을 위한 열의 이름
   * @param { string | number } whereValue 조건 지정을 위한 해당 컬럼 내의 값
   */
  public deleteRecord(
    tableName: string,
    whereColumn: string | number,
    whereValue: string | number
  ) {
    const sql = `DELETE FROM ${tableName} WHERE ${whereColumn} = ?`;

    this.db.run(sql, [whereValue], (err: Error) => {
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
  public deleteRecordsAll(tableName: string) {
    const sql = `DELETE FROM ${tableName}`;

    this.db.run(sql, (err: Error) => {
      if (err) {
        throw new Error(`모든 데이터 삭제 중 오류 발생`);
      } else {
        console.log(`"${tableName}" 테이블 내, 모든 데이터 삭제 완료`);
      }
    });
  }
}

export default class CreateData extends ImplementedDeleteData {
  constructor(fileWithPath: string) {
    super(fileWithPath);
  }
}
