import DBManager from "../../DBMANAGER";
import instanceChecker from "../../throw/instanceChecker";
import ITransactionController from "./TransactionControler.interface";

abstract class AbstractTransactionController
  extends DBManager
  implements ITransactionController
{
  constructor(fileWithPath: string) {
    super(fileWithPath);
  }
  abstract beginTransaction(callback: Function): void;

  abstract commit(): void;

  abstract rollback(): void;
}

class ImplementedTransactionController extends AbstractTransactionController {
  constructor(fileWithPath: string) {
    instanceChecker(new.target, ImplementedTransactionController);
    super(fileWithPath);
  }
  /**
   * @eonduck2 24.06.22
   * @param { function } callback 트랜잭션 작업이 진행될 콜백 함수
   * * 트랜잭션 시작 기능
   * * 단위 별로 묶는 작업 필요성 못 느낄 시, 사용할 필요 X
   */
  beginTransaction(callback: Function) {
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
  commit() {
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
  rollback() {
    this.db.run("ROLLBACK", (err: Error) => {
      if (err) {
        throw new Error(`트랜잭션 롤백 에러`);
      } else {
        console.log("트랜잭션 롤백 완료");
      }
    });
  }
}

export default class TransactionController extends ImplementedTransactionController {
  constructor(fileWithPath: string) {
    super(fileWithPath);
  }
}
