import DBManager from "../../DBMANAGER";
import instanceChecker from "../../throw/instanceChecker";
import IDropIndex from "./DropIndex.interface";

abstract class AbstractDropIndex extends DBManager implements IDropIndex {
  constructor(fileWithPath: string) {
    super(fileWithPath);
  }
  public abstract dropIndex(indexName: string): void;
}

class ImplementedDropIndex extends AbstractDropIndex {
  constructor(fileWithPath: string) {
    instanceChecker(new.target, ImplementedDropIndex);
    super(fileWithPath);
  }
  /**
   * @eonduck2 24.06.23
   * * 특정 인덱스를 삭제
   * @param { string } indexName 삭제할 인덱스의 이름
   */
  public dropIndex(indexName: string) {
    const sql = `DROP INDEX IF EXISTS ${indexName}`;
    this.db.run(sql, (err: Error) => {
      if (err) {
        throw new Error(`인덱스 삭제 에러`);
      } else {
        console.log(`"${indexName}" 인덱스 삭제 완료`);
      }
    });
  }
}

export default class DropIndex extends ImplementedDropIndex {
  constructor(fileWithPath: string) {
    super(fileWithPath);
  }
}
