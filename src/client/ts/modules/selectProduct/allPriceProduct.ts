/** 
 * @jojayeon 24.06.25
 * *제품을 총액 계산 
 * @param selectedProducts -객체 변수 넣어주면됨  
 * @returns 
 */

// 객체 들어오면 product로 받아서 그 객체의 price의 가격만 덧셈하는 방식
export function calculateTotalPrice(selectedProducts: any[]): number {
  // 선택한 제품들을 기반으로 총액 계산 로직 구현
  let totalPrice = 0;
  selectedProducts.forEach(product => {
    totalPrice += product.price;
  });
  return totalPrice;
}