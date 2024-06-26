import DBConnector from "../../DBConnector.js";

class AbstractBeginTransaction extends DBConnector {
  constructor(fileWithPath) {
    if (new.target === AbstractBeginTransaction) {
      throw new Error(
        "AbstractBeginTransaction 클래스는 직접 인스턴스화 할 수 없음"
      );
    }
    super(fileWithPath);
  }

  beginTransaction(callback) {}
}

export default class BeginTransaction extends AbstractBeginTransaction {
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
        console.log("Transaction started");
        callback();
      }
    });
  }
}
