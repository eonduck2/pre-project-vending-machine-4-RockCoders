import DBManager from "../../DBMANAGER";
import instanceChecker from "../../throw/instanceChecker";
import IGetIndexes from "./GetIndexes.interface";

type IndexInfo = {
  seq: number;
  name: string;
};

abstract class AbstractGetIndexes extends DBManager implements IGetIndexes {
  constructor(fileWithPath: string) {
    super(fileWithPath);
  }
  public abstract getSomeIndexes(
    tableName: string,
    columnName: string | number
  ): void;

  public abstract getAllIndexes(tableName: string): void;
}

class ImplementedGetIndexes extends AbstractGetIndexes {
  constructor(fileWithPath: string) {
    instanceChecker(new.target, ImplementedGetIndexes);
    super(fileWithPath);
  }
  /**
   * @eonduck2 24.06.23
   * * 특정 테이블 내 특정 컬럼의 인덱스를 조회
   * @param { string } tableName 인덱스 조회를 위해 지정할 테이블
   * @param { string | number } columnName 인덱스 조회 대상이 되는 컬럼
   */
  public getSomeIndexes(tableName: string, columnName: string | number) {
    const sql = `PRAGMA index_list(${tableName})`;
    this.db.all(sql, (err: Error, indexes: IndexInfo[]) => {
      if (err) {
        throw new Error(`인덱스 리스트 조회 실패: ${err}`);
      } else {
        indexes.forEach((index) => {
          const indexInfoSql = `PRAGMA index_info(${index.name})`;
          this.db.all(indexInfoSql, (err: Error, indexInfo: IndexInfo[]) => {
            if (err) {
              throw new Error(`인덱스 정보 조회 실패: ${err}`);
            } else {
              indexInfo.forEach((info) => {
                if (info.name === columnName) {
                  console.log(
                    `컬럼 이름: ${info.name}, 인덱스 시퀀스: ${index.seq}, 인덱스 이름: ${index.name} `
                  );
                }
              });
            }
          });
        });
      }
    });
  }

  /**
   * @eonduck2 24.06.23
   * * 특정 테이블의 모든 인덱스를 조회
   * @param { string } tableName 인덱스 조회 대상이 되는 테이블
   */
  public getAllIndexes(tableName: string) {
    const sql = `PRAGMA index_list(${tableName})`;
    this.db.all(sql, (err: Error, indexes: IndexInfo[]) => {
      if (err) {
        throw new Error(`인덱스 리스트 조회 실패: ${err}`);
      } else {
        indexes.forEach((index) => {
          const indexInfoSql = `PRAGMA index_info(${index.name})`;
          this.db.all(indexInfoSql, (err: Error, indexInfo: IndexInfo[]) => {
            if (err) {
              throw new Error(`인덱스 정보 조회 실패: ${err}`);
            } else {
              indexInfo.forEach((info) => {
                console.log(`컬럼 이름: ${info.name}`, index);
              });
            }
          });
        });
      }
    });
  }
}

export default class GetIndexes extends ImplementedGetIndexes {
  constructor(fileWithPath: string) {
    super(fileWithPath);
  }
}
