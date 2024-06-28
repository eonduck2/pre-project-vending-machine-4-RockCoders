/** @jojayeon 24.06.28
 * * 보고서 출력 - 아직 모듈로 쪼개지 않음
 */

import ReadData from "../../../../DB/modules/manipulation/ReadData.js";

// * ReadData 클래스를 사용하여 데이터베이스에서 데이터를 읽어오는 함수
const readSalesData = async (table: string): Promise<{ name: string; price: number }[]> => {
  const reader = new ReadData(table);// db위치
  try {
    const data = await reader.readRecordsAll(table);
    return data.map((row: any) => ({ name: row.name, price: row.price }));
  } finally {
    reader.close();
  }
};

// * 총 매출 계산 함수
async function calculateTotalRevenue(table: string): Promise<number> {
  try {
    const salesData = await readSalesData(table);
    const totalRevenue = salesData.reduce((total, item) => total + item.price, 0);
    return totalRevenue;
  } catch (error) {
    throw new Error(`총 매출 계산 중 오류 발생: ${error}`);
  }
}


// * 가장 많이 팔린 제품 계산 함수
async function calculateMostSoldProduct(table: string): Promise<string> {
  try {
    const salesData = await readSalesData(table);
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
    throw new Error(`가장 많이 팔린 제품 계산 중 오류 발생: ${error}`);
  }
}

// *판매 보고서 생성 및 출력 함수
async function generateSalesReport(table : string) {
  try {
    const totalRevenue = await calculateTotalRevenue(table);
    const mostSoldProduct = await calculateMostSoldProduct(table);

    const reportContainer = document.getElementById('reportContainer') as HTMLDivElement;
    reportContainer.innerHTML = `
      <div>총 매출: ${totalRevenue}원</div>
      <div>가장 많이 팔린 제품: ${mostSoldProduct}</div>
    `;
  } catch (error) {
    console.error('판매 보고서 생성 중 오류 발생:', error);
  }
}

// 보고서 출력
generateSalesReport('test_tble');//어떤 테이블인지 모르겠어서 매개변수로 넣음
//! 할일 
//! - 모듈로 쪼개기 
//! - DB name,price만 있는게 맞는지 확인 필요
