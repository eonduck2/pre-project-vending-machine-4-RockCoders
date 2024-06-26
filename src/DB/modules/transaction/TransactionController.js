import DBConnector from "../../DBConnector.js";

class AbstractTransactionController extends DBConnector {
  constructor(fileWithPath) {
    if (new.target === AbstractTransactionController) {
      throw new Error(
        "AbstractTransactionController 클래스는 직접 인스턴스화 할 수 없음"
      );
    }
    super(fileWithPath);
  }

  beginTransaction(callback) {}

  commit() {}

  rollback() {}
}

export default class TransactionController extends AbstractTransactionController {
  /**
   * @eonduck2 24.06.22
   * @param { function } callback 트랜잭션 작업이 진행될 콜백 함수
   * * 트랜잭션 시작 기능
   * * 단위 별로 묶는 작업 필요성 못 느낄 시, 사용할 필요 X
   */
  beginTransaction(callback) {
    this.db.run("BEGIN TRANSACTION", (err) => {
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
   * @param { function } callback 트랜잭션 작업이 진행될 콜백 함수
   * * 트랜잭션 시작 기능
   * * 단위 별로 묶는 작업 필요성 못 느낄 시, 사용할 필요 X
   */
  /**
   * @eonduck2 24.06.22
   * * 트랜잭션 커밋
   * * beginTransction 메서드 내, 쿼리 작업을 commit 할 때 사용
   * * 단위 별로 묶는 작업 필요성 못 느낄 시, 사용할 필요 X
   */
  commit() {
    this.db.run("COMMIT", (err) => {
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
    this.db.run("ROLLBACK", (err) => {
      if (err) {
        throw new Error(`트랜잭션 롤백 에러`);
      } else {
        console.log("트랜잭션 롤백 완료");
      }
    });
  }
}
