import DBConnector from "../../../../DB/DBConnector.js";
import ReadData from "../../../../DB/modules/table/ReadData.js";
import DBCloser from "../../../../DB/modules/table/DBCloser.js";

// 판매 보고서 생성 및 출력 함수
async function generateSalesReport() {
  const dbConnector = new DBConnector();
  const readData = new ReadData(dbConnector);
  //const reader = new ReadData(`test.db`);
  const dbCloser = new DBCloser(dbConnector);

  try {
    // 데이터베이스 연결
    await dbConnector.connect();
    // 데이터베이스에서 판매 데이터 읽기
    const salesData = await readData.readSalesData();

    // 총 매출 계산
    const totalRevenue = salesData.reduce((total: number, item: { [key: string]: number }) => total + item.price, 0);

    // 가장 많이 팔린 제품 계산
    const productCount: { [key: string]: number } = {};
    salesData.forEach((item: { [key: string]: number }) => {
      const { name } = item;
      productCount[name] = (productCount[name] || 0) + 1;
    });
    const productCountArray = Object.entries(productCount);
    productCountArray.sort((a, b) => b[1] - a[1]);
    const mostSoldProduct = productCountArray[0][0];

    // 결과 출력
    console.log('총 매출:', totalRevenue);
    console.log('가장 많이 팔린 제품:', mostSoldProduct);
  } catch (error) {
    console.error('판매 보고서 생성 중 오류 발생:', error);
  } finally {
    // 데이터베이스 연결 닫기
    await dbCloser.closeDatabase();
  }
}

// 보고서 출력
generateSalesReport();
