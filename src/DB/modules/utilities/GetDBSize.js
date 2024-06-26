import DBConnector from "../../DBConnector.js";

class AbstractGetDBSize extends DBConnector {
  constructor(fileWithPath) {
    if (new.target === AbstractGetDBSize) {
      throw new Error("AbstractGetDBSize 클래스는 직접 인스턴스화 할 수 없음");
    }
    super(fileWithPath);
  }

  getDBSize() {}
}

export default class GetDBSize extends AbstractGetDBSize {
  /**
   * @eonduck2 24.06.22
   * * 특정 DB 파일의 크기를 KB 단위로 나타내는 기능
   */
  getDBSize() {
    const sql = `PRAGMA page_count`;
    this.db.get(sql, (err, result) => {
      if (err) {
        throw new Error("DB 파일 크기 조회 에러");
      } else {
        const pageSize = 4096;
        const sizeInBytes = result.page_count * pageSize;
        const sizeInKB = sizeInBytes / 1024;
        console.log(`DB 파일 사이즈: ${sizeInKB}KB`);
      }
    });
  }
}
