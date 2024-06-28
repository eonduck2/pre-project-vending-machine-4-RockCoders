/** @jojayeon 24.06.28
 * * 보고서 출력하는 함수 제작 
 * * 보고서 출력 - 아직 모듈로 쪼개지 않음
 * 
 */

//! 주소 맞는지 확인 필요
//! 제일 아래 테이블도 확인 필요

import ReadData from "../../../../DB/modules/manipulation/ReadData.js";

// * ReadData 클래스를 사용하여 데이터베이스에서 데이터를 읽어오는 함수
const readSalesData = async (table: string): Promise<{ name: string; price: number }[]> => {
  const reader = new ReadData(table);// db위치
  try {
    const data = await reader.readRecordsAll(table);
    // console.log("5",data) - 혹시 어떻게 들어오는지 확인
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
async function calculateMostSoldProduct(table: string): Promise<string[]> {
  try {
    const salesData = await readSalesData(table);
    const productCount: { [key: string]: number } = {};

    // 각 제품별 판매 횟수 계산
    salesData.forEach((item) => {
      const { name } = item;
      productCount[name] = (productCount[name] || 0) + 1;
    });

    // 판매 횟수에 따라 정렬
    const productCountArray = Object.entries(productCount);
    productCountArray.sort((a, b) => b[1] - a[1]);

    // 가장 많이 팔린 제품들을 모두 담을 배열
    const mostSoldProducts: string[] = [];
    const maxCount = productCountArray[0][1]; // 제일 많이 팔린 제품의 판매 횟수

    // 가장 많이 팔린 제품들을 찾아 배열에 추가
    for (const [product, count] of productCountArray) {
      if (count === maxCount) {
        mostSoldProducts.push(product);
      } else {
        break; // 판매 횟수가 maxCount보다 작으면 루프 종료
      }
    }

    return mostSoldProducts;
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
generateSalesReport('test.db');

//! 할일 
//! - 모듈로 나누기
//// - 중복 체크 후 출력 추가 
//? - DB name,price만 있는게 맞는지 확인 필요
//?   - id 있을거 같은데?