import DBManager from "../../DBMANAGER.js";
import instanceChecker from "../../throw/instanceChecker.js";
import IBackUpNowDB from "./BackUpNowDB.interface";
import fs from "node:fs";

abstract class AbstractBackUpNowDB extends DBManager implements IBackUpNowDB {
  constructor(fileWithPath: string) {
    super(fileWithPath);
  }
  public abstract backupDB(backupFilePath: string): void;
}

class ImplementedBackUpNowDB extends AbstractBackUpNowDB {
  constructor(fileWithPath: string) {
    instanceChecker(new.target, ImplementedBackUpNowDB);
    super(fileWithPath);
  }
  /**
   * @eonduck2 24.06.22
   * @param { string } backupFilePath 현재 데이터 베이스를 백업시킬 경로와 파일명
   * * 예시 - ./src/backUpFiles/backup_mydb.db
   */
  public backupDB(backupFilePath: string) {
    fs.copyFile(this.fileWithPath, backupFilePath, (err) => {
      if (err) {
        throw new Error(`DB 백업 실행 오류`);
      } else {
        console.log(`"${backupFilePath}" DB 백업 성공`);
      }
    });
  }
}

export default class BackUpNowDB extends ImplementedBackUpNowDB {
  constructor(fileWithPath: string) {
    super(fileWithPath);
  }
}
