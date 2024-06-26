import DBConnector from "../../DBConnector.js";
import sqlite3 from "sqlite3";

class AbstractRestoreDBFromBackUp extends DBConnector {
  constructor(fileWithPath) {
    if (new.target === AbstractRestoreDBFromBackUp) {
      throw new Error(
        "AbstractRestoreDBFromBackUp 클래스는 직접 인스턴스화 할 수 없음"
      );
    }
    super(fileWithPath);
  }

  restoreDBFromBackup(backupDbFilePath, tableName) {}
}

export default class RestoreDBFromBackUp extends AbstractRestoreDBFromBackUp {
  /**
   * @eonduck2 24.06.22
   * * 특정 DB로부터 데이터들을 복사하는 기능
   * * 두 개의 DB간의 스키마가 완벽히 일치해야함
   * @param { string } backupDbFilePath 복사 대상이 될 DB파일의 경로와 파일명
   * @param { string } tableName 백업 DB의 복사 대상 테이블
   */
  restoreDBFromBackup(backupDbFilePath, tableName) {
    const backupDb = new sqlite3.Database(
      backupDbFilePath,
      sqlite3.OPEN_READONLY,
      (err) => {
        if (err) {
          throw new Error(`백업 DB 오픈 실패`, err);
        } else {
          console.log(`백업 DB ReadOnly 모드로 오픈 성공 `);

          backupDb.each(
            `SELECT * FROM ${tableName}`,
            (err, row) => {
              if (err) {
                throw new Error(`백업 DB 데이터 리딩 에러`);
              } else {
                const columns = Object.keys(row).join(", ");
                const placeholders = Object.keys(row)
                  .map(() => "?")
                  .join(", ");
                const values = Object.values(row);

                const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;

                this.db.run(sql, values, function (insertErr) {
                  if (insertErr) {
                    throw new Error(
                      `백업 DB에서의 데이터를 현재 DB에 삽입 실패`
                    );
                  } else {
                    console.log(`"${tableName}"에 행 삽입 완료`);
                  }
                });
              }
            },
            () => {
              backupDb.close((closeErr) => {
                if (closeErr) {
                  throw new Error(`백업 DB 연결 해제 실패`);
                } else {
                  console.log("백업 DB 연결 해제");
                }
              });
            }
          );
        }
      }
    );
  }
}
