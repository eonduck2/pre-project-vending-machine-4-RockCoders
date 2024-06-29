import DBManager from "../../DBMANAGER.js";
import instanceChecker from "../../throw/instanceChecker.js";
import IGetDBSize from "./GetDBSize.interface";

abstract class AbstractGetDBSize extends DBManager implements IGetDBSize {
  constructor(fileWithPath: string) {
    super(fileWithPath);
  }
  public abstract getDBSize(): void;
}

class ImplementedGetDBSize extends AbstractGetDBSize {
  constructor(fileWithPath: string) {
    instanceChecker(new.target, ImplementedGetDBSize);
    super(fileWithPath);
  }
  /**
   * @eonduck2 24.06.22
   * * 특정 DB 파일의 크기를 KB 단위로 나타내는 기능
   */
  public getDBSize() {
    const sql = `PRAGMA page_count`;
    this.db.get(sql, (err: Error, result: { page_count: number }) => {
      if (err) {
        throw new Error("DB 파일 크기 조회 에러");
      } else {
        const pageSize = 4096;
        const sizeInBytes = result.page_count * pageSize;
        const sizeInKB = sizeInBytes / 1024;
        console.log(`DB 파일 사이즈: ${sizeInKB}KB`);
      }
    });
  }
}

export default class GetDBSize extends ImplementedGetDBSize {
  constructor(fileWithPath: string) {
    super(fileWithPath);
  }
}
