import sqlite3 from "sqlite3";
import fs from "node:fs";

// * sqlite3 객체와 같은 기능을 하지만, 디버깅에 더 유리한 옵션을 포함한 verbose mode로 선언
const sqlite3VM = sqlite3.verbose();

export default class DataBaseManager {
  db;
  fileWithPath;
  /**
   * @eonduck2 24.06.21
   * * 인자로 받은 경로에 존재하는 DB 파일을 연결(존재하지 않을 시 생성)
   * @param { String } fileWithPath 문자열 타입의 경로(eg: src/test.db)
   */
  constructor(fileWithPath) {
    this.fileWithPath = fileWithPath;
    this.db = new sqlite3VM.Database(fileWithPath, (err) => {
      if (err) {
        throw new Error("DB 연결 실패");
      } else {
        console.log("DB 연결 성공");
      }
    });
  }

  /**
   * @eonduck2 24.06.21
   * * 인자로 받은 테이블 이름과 컬럼들로 테이블 구성
   * @param { string } tableName 생성시킬 테이블 이름
   * @param { array & object } columns
   * 배열 내부 객체 형태 ( 예시 - [{"name":"id", "type":"INTEGER PRIMARY KEY AUTOINCREMENT"}])
   */
  tableCreator(tableName, columns) {
    const columnsDefinition = columns
      .map((column) => `${column.name} ${column.type}`)
      .join(", ");
    const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnsDefinition})`;
    this.db.run(sql, (err) => {
      if (err) {
        throw new Error(`테이블 생성 에러 (${tableName})`, err);
      } else {
        console.log(`"${tableName}" 테이블 생성 완료`);
      }
    });
  }

  /**
   * @eonduck2 24.06.21
   * * 인자로 받은 테이블로, 데이터 삽입
   * @param { string } tableName 삽입시킬 테이블 이름
   * @param { object } record
   * 객체 형태 ( 예시 - {name:'lee', age: 30})
   */
  createRecord(tableName, record) {
    const columns = Object.keys(record).join(", ");
    const placeholders = Object.keys(record)
      .map(() => "?")
      .join(", ");
    const values = Object.values(record);
    const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;

    this.db.run(sql, values, (err) => {
      if (err) {
        throw new Error(`데이터 삽입(insert) 에러`, err);
      } else {
        console.log(`"${tableName}" 테이블에 데이터 삽입 성공`);
      }
    });
  }

  /**
   * @eonduck2 24.06.21
   * * 테이블과 컬럼명, 해당 컬럼 내의 값으로 데이터를 조회
   * @param { string } tableName 조회할 테이블
   * @param { string | number } column 조회할 테이블의 컬럼
   * @param { string | number } value 조회할 테이블의 컬럼의 값
   * @param { boolean } log true 값으로 보낼 시, 데이터 리턴과 동시에 console에 logging
   * @returns { promise } 특정 컬럼의 데이터가 포함된 Promise
   */
  readRecord(tableName, column, value, log = false) {
    const sql = `SELECT * FROM ${tableName} WHERE ${column} = ?`;
    return new Promise((resolve, reject) => {
      this.db.all(sql, [value], (err, rows) => {
        if (err) {
          throw new Error(`쿼리문 조회 에러`);
        } else if (log) {
          console.log(rows);
          resolve(rows);
        } else {
          resolve(rows);
        }
      });
    });
  }

  /**
   * @eonduck2 24.06.21
   * * 테이블 이름으로 해당 테이블 내의 모든 데이터 조회
   * @param { string } tableName 전체 데이터를 조회할 테이블
   * @param { boolean } log true 값으로 보낼 시, 데이터 리턴과 동시에 console에 logging
   * @returns { promise } 특정 테이블의 전체 데이터가 포함된 Promise
   */
  readRecordsAll(tableName, log) {
    const sql = `SELECT * FROM ${tableName}`;

    return new Promise((resolve, reject) => {
      this.db.all(sql, (err, rows) => {
        if (err) {
          throw new Error(`"${tableName}" 테이블 조회 실패`);
        } else if (log) {
          console.log(rows);
          resolve(rows);
        } else {
          resolve(rows);
        }
      });
    });
  }

  /**
   * @eonduck2 24.06.22
   * * 특정 테이블에 접근하여 데이터 업데이트
   * @param { string } tableName 업데이트 지정 대상이 될 테이블 이름
   * @param { string | number } whereColumn 조건 지정을 위한 열의 이름
   * @param { string | number } whereValue 조건 지정을 위한 해당 컬럼 내의 값
   * @param { object } updateData 업데이트 시킬 데이터(컬럼)
   *
   * * 사용 예시 updateRecord(`테이블 이름`, `조건 컬럼`, `조건 값`, { 변경시킬 컬럼: "변경시킬 값" });
   */
  updateRecord(tableName, whereColumn, whereValue, updateData) {
    const setClause = Object.keys(updateData)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = [...Object.values(updateData), whereValue];
    const sql = `UPDATE ${tableName} SET ${setClause} WHERE ${whereColumn} = ?`;

    this.db.run(sql, values, function (err) {
      if (err) {
        throw new Error(`컬럼 업데이트 에러`, err);
      }
      if (this.changes === 0) {
        throw new Error(`업데이트 조건에 맞는 레코드가 없습니다.`);
      } else {
        console.log(`데이터 업데이트 완료`);
      }
    });
  }

  /**
   * @eonduck2 24.06.22
   * * 테이블 이름과 특정 조건식으로 테이블 내 특정 행 삭제
   * @param { string } tableName 데이터 삭제가 진행될 테이블
   * @param { string | number } whereColumn 조건 지정을 위한 열의 이름
   * @param { string | number } whereValue 조건 지정을 위한 해당 컬럼 내의 값
   */
  deleteRecord(tableName, whereColumn, whereValue) {
    const sql = `DELETE FROM ${tableName} WHERE ${whereColumn} = ?`;

    this.db.run(sql, [whereValue], (err) => {
      if (err) {
        throw new Error(`데이터 딜리트 오류`);
      } else {
        console.log(`데이터 딜리트 성공`);
      }
    });
  }

  /**
   * @eonduck2 24.06.22
   * * 특정 테이블의 모든 데이터 삭제
   * @param { string } tableName 모든 데이터를 삭제하기 위해 지정할 테이블
   */
  deleteRecordsAll(tableName) {
    const sql = `DELETE FROM ${tableName}`;

    this.db.run(sql, (err) => {
      if (err) {
        throw new Error(`모든 데이터 삭제 중 오류 발생`);
      } else {
        console.log(`"${tableName}" 테이블 내, 모든 데이터 삭제 완료`);
      }
    });
  }

  /**
   * @eonduck2 24.06.22
   * * 특정 테이블에 특정 컬럼을 추가하는 기능
   * @param { string } tableName 대상으로 지정되는 테이블
   * @param { string | number } columnName 추가될 컬럼 이름
   * @param { string } columnType 추가될 컬럼 타입 예 - (TEXT, INTEGER)
   */
  addColumn(tableName, columnName, columnType) {
    const sql = `ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnType}`;

    this.db.run(sql, (err) => {
      if (err) {
        throw new Error(
          `"${tableName}" 테이블에 "${columnName}" 컬럼 추가 에러`
        );
      } else {
        console.log(`"${tableName}" 테이블에 "${columnName}" 컬럼 추가 성공`);
      }
    });
  }

  /**
   * @eonduck2 24.06.22
   * * 특정 테이블에 존재하는 특정 컬럼을 삭제하는 기능
   * @param { string } tableName 대상으로 지정되는 테이블
   * @param { string | number } columnName 삭제될 컬럼 이름
   */
  dropColumn(tableName, columnName) {
    const sql = `ALTER TABLE ${tableName} DROP COLUMN ${columnName}`;

    this.db.run(sql, (err) => {
      if (err) {
        throw new Error(
          `"${tableName}" 테이블에서의 "${columnName}" 컬럼 삭제 에러`
        );
      } else {
        console.log(`"${tableName}" 테이블의 "${columnName}" 컬럼 삭제 완료`);
      }
    });
  }

  /**
   * @eonduck2 24.06.22
   * @param { function } 트랜잭션 작업이 진행된 함수
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

  /**
   * @eonduck2 24.06.22
   * * 테이블에 관련된 정보를 조회
   * @param { string } tableName 대상이 될 테이블
   * @param { boolean } log true 값으로 보낼 시, 데이터 리턴과 동시에 console에 logging
   * @returns { promise } 특정 테이블 정보가 포함된 Promise
   */
  getTableInfo(tableName, log = false) {
    const sql = `PRAGMA table_info(${tableName})`;

    return new Promise((resolve, reject) => {
      this.db.all(sql, (err, rows) => {
        if (err) {
          throw new Error(`"${tableName}" 테이블 정보 조회 에러`);
        } else if (log) {
          console.log(rows);
          resolve(rows);
        } else {
          resolve(rows);
        }
      });
    });
  }

  /**
   * @eonduck2 24.06.22
   * * 테이블에 관련된 정보를 조회
   * @param { string } backupFilePath 현재 데이터 베이스를 백업시킬 경로와 파일명
   * * 예시 - ./src/backUpFiles/backup_mydb.db
   */
  backupDB(backupFilePath) {
    fs.copyFile(this.fileWithPath, backupFilePath, (err) => {
      if (err) {
        throw new Error(`DB 백업 실행 오류`);
      } else {
        console.log(`"${backupFilePath}" DB 백업 성공`);
      }
    });
  }

  /**
   * @eonduck2 24.06.22
   * * 특정 DB로부터 데이터들을 복사하는 기능
   * * 두 개의 DB간의 스키마가 완벽히 일치해야함
   * @param { string } backupDbFilePath 복사 대상이 될 DB파일의 경로와 파일명
   * @param { string } tableName 백업 DB의 복사 대상 테이블
   */
  restoreDBFromBackup(backupDbFilePath, tableName) {
    const backupDb = new sqlite3.Database(
      backupDbFilePath,
      sqlite3.OPEN_READONLY,
      (err) => {
        if (err) {
          throw new Error(`백업 DB 오픈 실패`, err);
        } else {
          console.log(`백업 DB ReadOnly 모드로 오픈 성공 `);

          backupDb.each(
            `SELECT * FROM ${tableName}`,
            (err, row) => {
              if (err) {
                throw new Error(`백업 DB 데이터 리딩 에러`);
              } else {
                const columns = Object.keys(row).join(", ");
                const placeholders = Object.keys(row)
                  .map(() => "?")
                  .join(", ");
                const values = Object.values(row);

                const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;

                this.db.run(sql, values, function (insertErr) {
                  if (insertErr) {
                    throw new Error(
                      `백업 DB에서의 데이터를 현재 DB에 삽입 실패`
                    );
                  } else {
                    console.log(`"${tableName}"에 행 삽입 완료`);
                  }
                });
              }
            },
            () => {
              backupDb.close((closeErr) => {
                if (closeErr) {
                  throw new Error(`백업 DB 연결 해제 실패`);
                } else {
                  console.log("백업 DB 연결 해제");
                }
              });
            }
          );
        }
      }
    );
  }

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

  /**
   * @eonduck2 24.06.23
   * * 특정 테이블의 특정 컬럼에 인덱스를 생성
   * @param { string } indexName 인덱스로 사용될 이름
   * @param { string } tableName 인덱스 생성을 위해 접근하는 테이블 이름
   * @param { string } column 인덱스를 생성시킬 컬럼 이름
   */
  createIndex(indexName, tableName, column) {
    const checkIndexSql = `PRAGMA index_list(${tableName})`;
    this.db.all(checkIndexSql, (err, indexes) => {
      if (err) {
        throw new Error(`인덱스 확인 오류: ${err.message}`);
      } else {
        const indexExists = indexes.some((index) => index.name === indexName);
        if (indexExists) {
          throw new Error(`인덱스 "${indexName}"가 이미 존재합니다`);
        } else {
          const createIndexSql = `CREATE INDEX ${indexName} ON ${tableName} (${column})`;
          this.db.run(createIndexSql, (err) => {
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

  /**
   * @eonduck2 24.06.23
   * * 특정 인덱스를 삭제
   * @param { string } indexName 삭제할 인덱스의 이름
   */
  dropIndex(indexName) {
    const sql = `DROP INDEX IF EXISTS ${indexName}`;
    this.db.run(sql, (err) => {
      if (err) {
        throw new Error(`인덱스 삭제 에러`);
      } else {
        console.log(`"${indexName}" 인덱스 삭제 완료`);
      }
    });
  }

  /**
   * @eonduck2 24.06.23
   * * 특정 테이블 내 특정 컬럼의 인덱스를 조회
   * @param { string } tableName 인덱스 조회를 위해 지정할 테이블
   * @param { string } columnName 인덱스 조회 대상이 되는 컬럼
   */
  getSomeIndexes(tableName, columnName) {
    const sql = `PRAGMA index_list(${tableName})`;
    this.db.all(sql, (err, indexes) => {
      if (err) {
        throw new Error(`인덱스 리스트 조회 실패: ${err}`);
      } else {
        indexes.forEach((index) => {
          const indexInfoSql = `PRAGMA index_info(${index.name})`;
          this.db.all(indexInfoSql, (err, indexInfo) => {
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
  getAllIndexes(tableName) {
    const sql = `PRAGMA index_list(${tableName})`;
    this.db.all(sql, (err, indexes) => {
      if (err) {
        throw new Error(`인덱스 리스트 조회 실패: ${err}`);
      } else {
        indexes.forEach((index) => {
          const indexInfoSql = `PRAGMA index_info(${index.name})`;
          this.db.all(indexInfoSql, (err, indexInfo) => {
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

  /**
   * @eonduck2 24.06.23
   * * 특정 인덱스를 사용하여 데이터 전체 조회
   * @param { string } tableName 테이블 이름
   * @param { string } indexName 인덱스 이름
   * @param { boolean } log true 값으로 보낼 시, 데이터 리턴과 동시에 console에 logging
   * @returns { promise } 특정 테이블의 전체 데이터가 포함된 Promise
   */
  readRecordsAllByIndex(tableName, indexName, log = false) {
    const sql = `SELECT * FROM ${tableName} INDEXED BY ${indexName}`;

    return new Promise((resolve, reject) => {
      this.db.all(sql, (err, rows) => {
        if (err) {
          throw new Error(`인덱스를 이용한 데이터 조회 오류`);
        } else if (log) {
          console.log(rows);
          resolve(rows);
        } else {
          resolve(rows);
        }
      });
    });
  }

  /**
   * @eonduck2 24.06.23
   * * 특정 테이블의 컬럼 순서 변경 및 데이터 복사
   * @param { string } tableName 변경할 테이블 이름
   * @param { Array<{name: string, type: string}> } newColumnOrder 새로운 컬럼 순서와 데이터 타입을 정의한 배열
   */
  reorderColumns(tableName, newColumnOrder) {
    // * 1. 새로운 테이블 이름을 생성
    const newTableName = `${tableName}_temp`;

    // * 2. 새로운 테이블의 컬럼 정의 SQL 생성
    const columnsDefinition = newColumnOrder
      .map((col) => `${col.name} ${col.type}`)
      .join(", ");

    // * 3. 새로운 테이블 생성
    const createTableSql = `CREATE TABLE ${newTableName} (${columnsDefinition})`;
    this.db.run(createTableSql, (err) => {
      if (err) {
        throw new Error(`새로운 테이블 생성 오류`);
      } else {
        // * 4. 데이터 복사 및 순서 맞춤
        const copyDataSql = `
          INSERT INTO ${newTableName} (${newColumnOrder
          .map((col) => col.name)
          .join(", ")})
          SELECT ${newColumnOrder
            .map((col) => col.name)
            .join(", ")} FROM ${tableName}`;
        this.db.run(copyDataSql, (err) => {
          if (err) {
            throw new Error(`데이터 복사 오류`);
          } else {
            // * 5. 기존 테이블 삭제
            const dropTableSql = `DROP TABLE ${tableName}`;
            this.db.run(dropTableSql, (err) => {
              if (err) {
                throw new Error(`기존 테이블 삭제 오류`);
              } else {
                // * 6. 새로운 테이블 이름을 기존 테이블 이름으로 변경
                const renameTableSql = `ALTER TABLE ${newTableName} RENAME TO ${tableName}`;
                this.db.run(renameTableSql, (err) => {
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

  /**
   * @eonduck2 24.06.22
   * * DB와의 연결 해제
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
