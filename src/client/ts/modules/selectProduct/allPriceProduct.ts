// * 제품 총액 계산 함수
export function calculateTotalPrice(selectedProducts: any[]): number {
  // 선택한 제품들을 기반으로 총액 계산 로직 구현
  let totalPrice = 0;
  selectedProducts.forEach(product => {
    totalPrice += product.price;
  });
  return totalPrice;
}