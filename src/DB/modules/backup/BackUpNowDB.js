import DBConnector from "../../DBConnector.js";
import fs from "node:fs";

class AbstractBackUpNowDB extends DBConnector {
  constructor(fileWithPath) {
    if (new.target === AbstractBackUpNowDB) {
      throw new Error(
        "AbstractBackUpNowDB 클래스는 직접 인스턴스화 할 수 없음"
      );
    }
    super(fileWithPath);
  }

  backupDB(backupFilePath) {}
}

export default class BackUpNowDB extends AbstractBackUpNowDB {
  /**
   * @eonduck2 24.06.22
   * @param { string } backupFilePath 현재 데이터 베이스를 백업시킬 경로와 파일명
   * * 예시 - ./src/backUpFiles/backup_mydb.db
   */
  backupDB(backupFilePath) {
    fs.copyFile(this.fileWithPath, backupFilePath, (err) => {
      if (err) {
        throw new Error(`DB 백업 실행 오류`);
      } else {
        console.log(`"${backupFilePath}" DB 백업 성공`);
      }
    });
  }
}
