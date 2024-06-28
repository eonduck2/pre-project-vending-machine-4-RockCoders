import sqlite3 from 'sqlite3';

const dbPath = 'test.db';  // 데이터베이스 파일 경로

// SQLite 데이터베이스 연결
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('데이터베이스 연결 실패:', err.message);
  } else {
    console.log('데이터베이스 연결 성공');
  }
});

// 테이블 생성 및 데이터 삽입 함수
const createTableAndInsertData = () => {
  // sales 테이블 생성
  db.run(`CREATE TABLE IF NOT EXISTS sales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price INTEGER NOT NULL
  )`, (err) => {
    if (err) {
      console.error('테이블 생성 실패:', err.message);
      return;
    }
    console.log('테이블 생성 성공');

    // 초기 데이터 삽입
    const salesData = [
      { name: 'Product A', price: 100 },
      { name: 'Product B', price: 200 },
      { name: 'Product C', price: 300 },
      { name: 'Product D', price: 400 },
      { name: 'Product E', price: 500 }
    ];

    const insertStmt = db.prepare('INSERT INTO sales (name, price) VALUES (?, ?)');
    salesData.forEach(item => {
      insertStmt.run(item.name, item.price, (err) => {
        if (err) {
          console.error('데이터 삽입 실패:', err.message);
        } else {
          console.log('데이터 삽입 성공:', item.name);
        }
      });
    });
    insertStmt.finalize();
  });
};

// 데이터베이스 연결 종료
const closeDbConnection = () => {
  db.close((err) => {
    if (err) {
      console.error('데이터베이스 연결 닫기 실패:', err.message);
    } else {
      console.log('데이터베이스 연결 닫기 성공');
    }
  });
};

// 실행
db.serialize(() => {
  createTableAndInsertData();
  closeDbConnection();
});