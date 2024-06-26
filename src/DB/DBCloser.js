import DBConnector from "./DBConnector.js";

class AbstractDBCloser extends DBConnector {
  constructor(fileWithPath) {
    if (new.target === AbstractDBCloser) {
      throw new Error("AbstractDBCloser 클래스는 직접 인스턴스화 할 수 없음");
    }
    super(fileWithPath);
  }

  close() {}
}

export default class DBCloser extends AbstractDBCloser {
  /**
   * @eonduck2 24.06.22
   * * 특정 DB와의 연결 해제
   */
  close() {
    this.db.close((err) => {
      if (err) {
        throw new Error("DB 커넥션 close 오류");
      } else {
        console.log("DB 연결 해제");
      }
    });
  }
}
