import IDBConnector from "./DBConnector.interface";

const sqlite3VM = require(`sqlite3`).verbose();
const database = sqlite3VM.Database;

abstract class AbstractDBConnector implements IDBConnector {
  protected abstract db: typeof database;

  abstract fileWithPath: string;
  abstract close(): void;
}

export default class DBConnector extends AbstractDBConnector {
  protected db: typeof database;
  public fileWithPath: string;
  /**
   * @eonduck2 24.06.21
   * * 인자로 받은 경로에 존재하는 DB 파일을 연결(존재하지 않을 시 생성)
   * @param { String } fileWithPath 문자열 타입의 경로(eg: src/test.db)
   */
  constructor(fileWithPath: string) {
    super();
    if (new.target === DBConnector) {
      throw new Error("DBManager 클래스는 직접 인스턴스화 할 수 없음");
    }
    this.fileWithPath = fileWithPath;
    this.db = new sqlite3VM.Database(fileWithPath, (err: Error | null) => {
      if (err) {
        throw new Error("DB 연결 실패");
      } else {
      }
    });
  }

  /**
   * @eonduck2 24.06.22
   * * DB와의 연결 해제
   */
  public close(): void {
    this.db.close((err: Error | null) => {
      if (err) {
        throw new Error("DB 커넥션 close 오류");
      } else {
        console.log("DB 연결 해제");
      }
    });
  }
}
