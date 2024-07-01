/** @jojayeon 24.06.28
 * * 총 매출 계산기
 */


import readSalesData from './ReadSalesData';

const calculateTotalRevenue = async (table: string): Promise<number> => {
  try {
    const salesData = await readSalesData(table);
    const totalRevenue = salesData.reduce((total, item) => total + item.price, 0);
    return totalRevenue;
  } catch (error) {
    throw new Error(`총 매출 계산 중 오류 발생: ${error}`);
  }
}

export default calculateTotalRevenue;