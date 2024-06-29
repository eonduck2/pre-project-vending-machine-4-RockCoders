import IDBManager from "./DBConnector.interface";
import instanceChecker from "./throw/instanceChecker";

const sqlite3VM = require(`sqlite3`).verbose();
const database = sqlite3VM.Database;

abstract class AbstractDBManager implements IDBManager {
  protected abstract db: typeof database;

  abstract fileWithPath: string;
  abstract close(): void;
  abstract serialize(callback: Function): void;
  abstract parallelize(callback: Function): void;
}

class ImplementedDBManager extends AbstractDBManager {
  protected db: typeof database;
  public fileWithPath: string;
  /**
   * @eonduck2 24.06.21
   * * 인자로 받은 경로에 존재하는 DB 파일을 연결(존재하지 않을 시 생성)
   * @param { String } fileWithPath 문자열 타입의 경로(eg: src/test.db)
   */
  constructor(fileWithPath: string) {
    super();
    instanceChecker(new.target, ImplementedDBManager);

    this.fileWithPath = fileWithPath;
    this.db = new sqlite3VM.Database(fileWithPath, (err: Error) => {
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
    this.db.close((err: Error) => {
      if (err) {
        throw new Error("DB 커넥션 close 오류");
      } else {
        console.log("DB 연결 해제");
      }
    });
  }

  public serialize(callback: Function): void {
    this.db.serialize(() => {
      callback();
    });
  }

  public parallelize(callback: Function): void {
    this.db.parallelize(() => {
      callback();
    });
  }
}

export default class DBManager extends ImplementedDBManager {
  constructor(fileWithPath: string) {
    super(fileWithPath);
  }
}
