import DBConnector from './DBConnector.js';
import ReadData from './ReadData.js';

// ReadData 클래스를 사용하여 데이터베이스에서 데이터를 읽어오는 함수
console.log("1",DBConnector)
console.log("2",ReadData)



const readSalesData = async (table) => {
  const dbConnector = new DBConnector();
  const reader = new ReadData(dbConnector);
  console.log("3",dbConnector)
  console.log("4",reader)
  
  try {
    await dbConnector.connect(); // 데이터베이스 연결
    const data = await reader.readRecordsAll(table);
    console.log("5",data)

    // 데이터 매핑
    const salesData = data.map((row) => ({ name: row.name, price: row.price }));
    return salesData;
  } catch (error) {
    console.error('데이터 읽기 중 오류 발생:', error);
    throw error;
  } finally {
    reader.close(); // 데이터베이스 연결 닫기
  }
};

// 총 매출 계산 함수
async function calculateTotalRevenue(table) {
  try {
    const salesData = await readSalesData(table);
    console.log("6",salesData)
    const totalRevenue = salesData.reduce((total, item) => total + item.price, 0);
    console.log("7",totalRevenue)
    
    return totalRevenue;
  } catch (error) {
    throw new Error(`총 매출 계산 중 오류 발생: ${error}`);
  }
}

// 가장 많이 팔린 제품 계산 함수
async function calculateMostSoldProduct(table) {
  try {
    const salesData = await readSalesData(table);
    const productCount = {};

    salesData.forEach((item) => {
      const { name } = item;
      console.log("8",{ name })
      productCount[name] = (productCount[name] || 0) + 1;
      console.log("9",productCount[name])
    });
    
    const productCountArray = Object.entries(productCount);
    console.log("10",productCountArray)
    productCountArray.sort((a, b) => b[1] - a[1]);
    console.log("11",productCountArray.sort((a, b) => b[1] - a[1]))
    
    const mostSoldProduct = productCountArray[0][0];
    console.log("12",mostSoldProduct)
    return mostSoldProduct;
  } catch (error) {
    throw new Error(`가장 많이 팔린 제품 계산 중 오류 발생: ${error}`);
  }
}

// 판매 보고서 생성 및 출력 함수
async function generateSalesReport(table) {
  try {
    const totalRevenue = await calculateTotalRevenue(table);
    const mostSoldProduct = await calculateMostSoldProduct(table);

    // 실제 HTML 요소 조작이 아닌 콘솔 출력으로 대체
    console.log('총 매출:', totalRevenue);
    console.log('가장 많이 팔린 제품:', mostSoldProduct);

  } catch (error) {
    console.error('판매 보고서 생성 중 오류 발생:', error);
  }
}

// 보고서 출력
generateSalesReport('test.db');