import sqlite3 from 'sqlite3';

const sqlite3VM = sqlite3.verbose();

// SQLite 데이터베이스 파일 경로
const dbPath = 'path/to/your/database.db';

// DB 연결 클래스
class DBManager {
  private db: sqlite3.Database | null = null;

  constructor() {
    this.connect();
  }

  private connect(): void {
    this.db = new sqlite3VM.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
      if (err) {
        console.error('SQLite 데이터베이스 연결 실패:', err.message);
      } else {
        console.log('SQLite 데이터베이스 연결 성공');
      }
    });
  }

  readSalesData(): Promise<{ name: string; price: number }[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('데이터베이스 연결이 되어있지 않습니다.'));
        return;
      }

      const sql = 'SELECT name, price FROM sales';
      this.db.all(sql, [], (err, rows) => {
        if (err) {
          reject(new Error(`쿼리문 조회 에러: ${err.message}`));
        } else {
          resolve(rows);
        }
      });
    });
  }

  close(): void {
    if (this.db) {
      this.db.close((err) => {
        if (err) {
          console.error('데이터베이스 연결 닫기 실패:', err.message);
        } else {
          console.log('SQLite 데이터베이스 연결 닫힘');
        }
      });
    }
  }
}

// 총 매출 계산 함수
async function calculateTotalRevenue(): Promise<number> {
  const dbManager = new DBManager();
  try {
    const salesData = await dbManager.readSalesData();
    const totalRevenue = salesData.reduce((total, item) => total + item.price, 0);
    return totalRevenue;
  } catch (error) {
    throw new Error(`총 매출 계산 중 오류 발생: error`);
  } finally {
    dbManager.close();
  }
}

// 가장 많이 팔린 제품 계산 함수
async function calculateMostSoldProduct(): Promise<string> {
  const dbManager = new DBManager();
  try {
    const salesData = await dbManager.readSalesData();
    const productCount: { [key: string]: number } = {};

    salesData.forEach((item) => {
      const { name } = item;
      productCount[name] = (productCount[name] || 0) + 1;
    });

    const productCountArray = Object.entries(productCount);
    productCountArray.sort((a, b) => b[1] - a[1]);

    const mostSoldProduct = productCountArray[0][0];
    return mostSoldProduct;
  } catch (error) {
    throw new Error(`가장 많이 팔린 제품 계산 중 오류 발생: error`);
  } finally {
    dbManager.close();
  }
}

// 판매 보고서 생성 및 출력 함수
async function generateSalesReport(): Promise<void> {
  try {
    const totalRevenue = await calculateTotalRevenue();
    const mostSoldProduct = await calculateMostSoldProduct();

    console.log('총 매출:', totalRevenue);
    console.log('가장 많이 팔린 제품:', mostSoldProduct);
  } catch (error) {
    console.error('판매 보고서 생성 중 오류 발생:', error);
  }
}

// 보고서 출력
generateSalesReport();
