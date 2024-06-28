import ReadData from "../../../../DB/modules/manipulation/ReadData.js";

// ReadData 클래스를 사용하여 데이터베이스에서 데이터를 읽어오는 함수
const readSalesData = async (table) => {
  const reader = new ReadData('test.db'); // db 위치를 적절히 설정
  try {
    const data = await reader.readRecordsAll(table);
    return data.map((row) => ({ name: row.name, price: row.price }));
  } finally {
    reader.close();
  }
};

// *총 매출 계산 함수
async function calculateTotalRevenue(table) {
  try {
    const salesData = await readSalesData(table);
    const totalRevenue = salesData.reduce((total, item) => total + item.price, 0);
    return totalRevenue;
  } catch (error) {
    throw new Error(`총 매출 계산 중 오류 발생: ${error}`);
  }
}

// *가장 많이 팔린 제품 계산 함수
async function calculateMostSoldProduct(table) {
  try {
    const salesData = await readSalesData(table);
    const productCount = {};

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
async function generateSalesReport(table) {
  try {
    const totalRevenue = await calculateTotalRevenue(table);
    const mostSoldProduct = await calculateMostSoldProduct(table);

    console.log(totalRevenue)
console.log(mostSoldProduct)
    // const reportContainer = document.getElementById('reportContainer');
    // reportContainer.innerHTML = `
    //   <div>총 매출: ${totalRevenue}원</div>
    //   <div>가장 많이 팔린 제품: ${mostSoldProduct}</div>
    // `;
  } catch (error) {
    console.error('판매 보고서 생성 중 오류 발생:', error);
  }
}

// 보고서 출력 버튼 이벤트 리스너
document.getElementById('adminReportBtn').addEventListener('click', () => {
  generateSalesReport('sales');
});
