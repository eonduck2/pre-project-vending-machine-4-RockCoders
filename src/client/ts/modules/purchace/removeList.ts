/**
 * @yuxincxoi 24.07.12
 * * 구매하기 버튼 클릭시 실행될 함수
 * * 구매 완료 되면 장바구니 초기화
 */

export default () => {
  // * 장바구니 목록 삭제
  const cartLi = document.getElementsByClassName('cartLi')!;
  Array.from(cartLi).forEach((child) => {child.remove()});
  // * 장바구니 총액 삭제
  const totalPrice = document.getElementById("total-price");
  totalPrice?.remove();
};
