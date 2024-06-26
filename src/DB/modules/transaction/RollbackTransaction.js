import DBConnector from "../../DBConnector.js";

class AbstractRollbackTransaction extends DBConnector {
  constructor(fileWithPath) {
    if (new.target === AbstractRollbackTransaction) {
      throw new Error(
        "AbstractRollbackTransaction 클래스는 직접 인스턴스화 할 수 없음"
      );
    }
    super(fileWithPath);
  }

  rollback() {}
}

export default class RollbackTransaction extends AbstractRollbackTransaction {
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
