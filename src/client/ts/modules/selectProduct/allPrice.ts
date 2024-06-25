/**
 * * @jojayeon 24.06.25
 * * 총액 출력하는 함수
 * 저장해 놓은 총액 넘버를 가져와서 출력만 함
 * @param totalPrice - 총액 calculateTotalPrice의 리턴값을 넣어준다.
 */

export function displayTotalPrice(totalPrice: number) {
  const totalPriceElement = document.getElementById('total-price');
  if (totalPriceElement) {
    //이 부분이 표시되는 부분이다. 실질적으로 보이는 구역 
    totalPriceElement.innerText = `총액: ${totalPrice}원`;
  }
}
