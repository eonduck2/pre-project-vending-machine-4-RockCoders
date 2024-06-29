import DBConnector from "../../../DBMANAGER";
import instanceChecker from "../../../throw/instanceChecker";
import IReorderColumns from "./ReorderColumns.interface";

abstract class AbstractReorderColumns
  extends DBConnector
  implements IReorderColumns
{
  constructor(fileWithPath: string) {
    super(fileWithPath);
  }

  abstract reorderColumns(tableName: string, columns: object): void;
}

class ImplementedReorderColumns extends AbstractReorderColumns {
  constructor(fileWithPath: string) {
    instanceChecker(new.target, ImplementedReorderColumns);
    super(fileWithPath);
  }
  /**
   * @eonduck2 24.06.23
   * * 특정 테이블의 컬럼 순서 변경 및 데이터 복사
   * @param { string } tableName 변경할 테이블 이름
   * @param { object } columns 컬럼 이름과 타입을 정의한 객체
   */
  reorderColumns(tableName: string, columns: object) {
    // * 1. 새로운 테이블 이름을 생성
    const newTableName = `${tableName}_temp`;

    // * 2. 새로운 테이블의 컬럼 정의 SQL 생성
    const columnsDefinition = Object.entries(columns)
      .map(([name, type]) => `${name} ${type}`)
      .join(", ");

    // * 3. 새로운 테이블 생성
    const createTableSql = `CREATE TABLE ${newTableName} (${columnsDefinition})`;
    this.db.run(createTableSql, (err: Error) => {
      if (err) {
        throw new Error(`새로운 테이블 생성 오류`);
      } else {
        // * 4. 데이터 복사 및 순서 맞춤
        const copyDataSql = `
          INSERT INTO ${newTableName} (${Object.keys(columns).join(", ")})
          SELECT ${Object.keys(columns).join(", ")} FROM ${tableName}`;
        this.db.run(copyDataSql, (err: Error) => {
          if (err) {
            throw new Error(`데이터 복사 오류`);
          } else {
            // * 5. 기존 테이블 삭제
            const dropTableSql = `DROP TABLE ${tableName}`;
            this.db.run(dropTableSql, (err: Error) => {
              if (err) {
                throw new Error(`기존 테이블 삭제 오류`);
              } else {
                // * 6. 새로운 테이블 이름을 기존 테이블 이름으로 변경
                const renameTableSql = `ALTER TABLE ${newTableName} RENAME TO ${tableName}`;
                this.db.run(renameTableSql, (err: Error) => {
                  if (err) {
                    throw new Error(`테이블 이름 변경 오류`);
                  } else {
                    console.log(
                      `테이블 "${tableName}"의 컬럼 순서 변경 및 데이터 복사 완료`
                    );
                  }
                });
              }
            });
          }
        });
      }
    });
  }
}

export default class ReorderColumns extends ImplementedReorderColumns {
  constructor(fileWithPath: string) {
    super(fileWithPath);
  }
}
