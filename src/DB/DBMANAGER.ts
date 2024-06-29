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

  abstract beginTransaction(callback: Function): void;

  abstract commit(): void;

  abstract rollback(): void;
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

  /**
   * @eonduck2 24.06.22
   * @param { function } callback 트랜잭션 작업이 진행될 콜백 함수
   * * 트랜잭션 시작 기능
   * * 단위 별로 묶는 작업 필요성 못 느낄 시, 사용할 필요 X
   */
  public beginTransaction(callback: Function) {
    this.db.run("BEGIN TRANSACTION", (err: Error) => {
      if (err) {
        throw new Error(`트랜잭션 스타팅 에러`);
      } else {
        console.log("트랜잭션 시작");
        callback();
      }
    });
  }

  /**
   * @eonduck2 24.06.22
   * * 트랜잭션 커밋
   * * beginTransction 메서드 내, 쿼리 작업을 commit 할 때 사용
   * * 단위 별로 묶는 작업 필요성 못 느낄 시, 사용할 필요 X
   */
  public commit() {
    this.db.run("COMMIT", (err: Error) => {
      if (err) {
        throw new Error(`트랜잭션 커밋 에러`);
      } else {
        console.log("트랜잭션 커밋 완료");
      }
    });
  }

  /**
   * @eonduck2 24.06.22
   * * 트랜잭션 롤백
   * * beginTransction 메서드 내, 쿼리 작업을 rollback 할 때 사용
   * * 단위 별로 묶는 작업 필요성 못 느낄 시, 사용할 필요 X
   */
  public rollback() {
    this.db.run("ROLLBACK", (err: Error) => {
      if (err) {
        throw new Error(`트랜잭션 롤백 에러`);
      } else {
        console.log("트랜잭션 롤백 완료");
      }
    });
  }
}

export default class DBManager extends ImplementedDBManager {
  constructor(fileWithPath: string) {
    super(fileWithPath);
  }
}
