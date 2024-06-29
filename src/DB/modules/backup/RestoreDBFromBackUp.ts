import DBManager from "../../DBMANAGER";
import instanceChecker from "../../throw/instanceChecker";
import IRestoreDBFromBackUp from "./RestoreDBFromBackUp.interface";

const sqlite3VM = require(`sqlite3`).verbose();

abstract class AbstractRestoreDBFromBackUp
  extends DBManager
  implements IRestoreDBFromBackUp
{
  constructor(fileWithPath: string) {
    super(fileWithPath);
  }
  public abstract restoreDBFromBackup(
    backupDbFilePath: string,
    tableName: string
  ): void;
}

class ImplementedRestoreDBFromBackUp extends AbstractRestoreDBFromBackUp {
  constructor(fileWithPath: string) {
    instanceChecker(new.target, ImplementedRestoreDBFromBackUp);
    super(fileWithPath);
  }
  /**
   * @eonduck2 24.06.22
   * * 특정 DB로부터 데이터들을 복사하는 기능
   * * 두 개의 DB간의 스키마가 완벽히 일치해야함
   * @param { string } backupDbFilePath 복사 대상이 될 DB파일의 경로와 파일명
   * @param { string } tableName 백업 DB의 복사 대상 테이블
   */
  public restoreDBFromBackup(backupDbFilePath: string, tableName: string) {
    const backupDb = new sqlite3VM.Database(
      backupDbFilePath,
      sqlite3VM.OPEN_READONLY,
      (err: Error) => {
        if (err) {
          throw new Error(`백업 DB 오픈 실패`);
        } else {
          console.log(`백업 DB ReadOnly 모드로 오픈 성공 `);

          backupDb.each(
            `SELECT * FROM ${tableName}`,
            (err: Error, row: object) => {
              if (err) {
                throw new Error(`백업 DB 데이터 리딩 에러`);
              } else {
                const columns = Object.keys(row).join(", ");
                const placeholders = Object.keys(row)
                  .map(() => "?")
                  .join(", ");
                const values = Object.values(row);

                const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;

                this.db.run(sql, values, function (insertErr: Error) {
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
              backupDb.close((closeErr: Error) => {
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

export default class DBFromBackUp extends ImplementedRestoreDBFromBackUp {
  constructor(fileWithPath: string) {
    super(fileWithPath);
  }
}
