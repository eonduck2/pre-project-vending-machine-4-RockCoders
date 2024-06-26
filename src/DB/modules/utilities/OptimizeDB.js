import DBConnector from "../../DBConnector.js";

class AbstractOptimizeDB extends DBConnector {
  constructor(fileWithPath) {
    if (new.target === AbstractOptimizeDB) {
      throw new Error("AbstractOptimizeDB 클래스는 직접 인스턴스화 할 수 없음");
    }
    super(fileWithPath);
  }

  optimizeDB() {}
}

export default class OptimizeDB extends AbstractOptimizeDB {
  /**
   * @eonduck2 24.06.22
   * * DB를 최적화 하는 기능
   * * DB 파일이 계속 사용 되면서 파일 크기가 지속적으로 늘어나는 상황 방지 가능
   * * 특정 테이블에서 데이터 조작(삽입, 삭제, 갱신 ...) 후, 사용 권장
   */
  optimizeDB() {
    this.db.run("VACUUM", (err) => {
      if (err) {
        throw new Error("DB 최적화 실패");
      } else {
        console.log("DB 최적화 성공");
      }
    });
  }
}
