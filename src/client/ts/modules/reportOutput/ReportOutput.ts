import calculateTotalRevenue from "./CalculateTotalSales"
import calculateMostSoldProduct from "./calculateMostSoldProduct"

const generateSalesReport = async (table : string) => {
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
export default generateSalesReport;