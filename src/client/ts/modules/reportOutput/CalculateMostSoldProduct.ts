/** @jojayeon 24.06.28
 * *가장 많이 팔린 물품 찾기
 */
import readSalesData from './ReadSalesData';

const calculateMostSoldProduct = async (table: string): Promise<string[]> => {
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
export default calculateMostSoldProduct;