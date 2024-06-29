import DBManager from "../../DBMANAGER";
import instanceChecker from "../../throw/instanceChecker";
import ICreateIndex from "./CreateIndex.interface";

type IndexInfo = {
  name: string;
};

abstract class AbstractCreateIndex extends DBManager implements ICreateIndex {
  constructor(fileWithPath: string) {
    super(fileWithPath);
  }
  public abstract createIndex(
    indexName: string,
    tableName: string,
    column: string | number
  ): void;
}

class ImplementedCreateIndex extends AbstractCreateIndex {
  constructor(fileWithPath: string) {
    instanceChecker(new.target, ImplementedCreateIndex);
    super(fileWithPath);
  }
  /**
   * @eonduck2 24.06.23
   * * 특정 테이블의 특정 컬럼에 인덱스를 생성
   * @param { string } indexName 인덱스로 사용될 이름
   * @param { string } tableName 인덱스 생성을 위해 접근하는 테이블 이름
   * @param { string | number } column 인덱스를 생성시킬 컬럼 이름
   */
  public createIndex(
    indexName: string,
    tableName: string,
    column: string | number
  ) {
    const checkIndexSql = `PRAGMA index_list(${tableName})`;
    this.db.all(checkIndexSql, (err: Error, indexes: IndexInfo[]) => {
      if (err) {
        throw new Error(`인덱스 확인 오류: ${err.message}`);
      } else {
        const indexExists = indexes.some((index) => index.name === indexName);
        if (indexExists) {
          throw new Error(`인덱스 "${indexName}"가 이미 존재합니다`);
        } else {
          const createIndexSql = `CREATE INDEX ${indexName} ON ${tableName} (${column})`;
          this.db.run(createIndexSql, (err: Error) => {
            if (err) {
              throw new Error(`컬럼 인덱스 생성 오류: ${err.message}`);
            } else {
              console.log(
                `"${tableName}" 테이블의 "${column}" 컬럼에 "${indexName}" 인덱스 생성 완료`
              );
            }
          });
        }
      }
    });
  }
}

export default class CreateIndex extends ImplementedCreateIndex {
  constructor(fileWithPath: string) {
    super(fileWithPath);
  }
}
