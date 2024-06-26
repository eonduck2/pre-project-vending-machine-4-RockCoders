import sqlite3 from 'sqlite3';

const sqlite3VM = sqlite3.verbose();

// 메모리 데이터베이스 생성
const dbPath = ':memory:';
const db = new sqlite3VM.Database(dbPath);

// 판매 데이터 생성 // 더임임
const salesData = [
  { name: 'product1', price: 100 },
  { name: 'product2', price: 150 },
  { name: 'product1', price: 100 },
  { name: 'product3', price: 200 },
  { name: 'product2', price: 150 },
  { name: 'product3', price: 200 },
  { name: 'product1', price: 100 },
];

// 테이블 생성 및 데이터 삽입
db.serialize(() => {
  db.run('CREATE TABLE sales (name TEXT, price INTEGER)');
  const stmt = db.prepare('INSERT INTO sales (name, price) VALUES (?, ?)');
  salesData.forEach((data) => {
    stmt.run(data.name, data.price);
  });
  stmt.finalize();
});

// 총 매출 계산 함수
async function calculateTotalRevenue(): Promise<number> {
  return new Promise((resolve, reject) => {
    db.all('SELECT price FROM sales', (err, rows) => {
      if (err) {
        reject(new Error(`총 매출 계산 중 오류 발생: ${err.message}`));
      } else {
        const totalRevenue = rows.reduce((total, row) => total + row.price, 0);
        resolve(totalRevenue);
      }
    });
  });
}

// 가장 많이 팔린 제품 계산 함수
async function calculateMostSoldProduct(): Promise<string> {
  return new Promise((resolve, reject) => {
    db.all('SELECT name, COUNT(*) as count FROM sales GROUP BY name ORDER BY count DESC LIMIT 1', (err, rows) => {
      if (err) {
        reject(new Error(`가장 많이 팔린 제품 계산 중 오류 발생: ${err.message}`));
      } else {
        const mostSoldProduct = rows.length > 0 ? rows[0].name : '';
        resolve(mostSoldProduct);
      }
    });
  });
}

// 테스트 함수 실행
async function testOperations(): Promise<void> {
  try {
    const totalRevenue = await calculateTotalRevenue();
    console.log('총 매출:', totalRevenue);

    const mostSoldProduct = await calculateMostSoldProduct();
    console.log('가장 많이 팔린 제품:', mostSoldProduct);
  } catch (error) {
    console.error('테스트 도중 오류 발생:', error);
  } finally {
    // 데이터베이스 닫기
    db.close((err) => {
      if (err) {
        console.error('데이터베이스 연결 닫기 실패:', err.message);
      } else {
        console.log('메모리 데이터베이스 연결 닫힘');
      }
    });
  }
}

// 테스트 함수 실행
testOperations();