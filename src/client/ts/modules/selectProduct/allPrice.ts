// * 총액 출력하는 함수

export function displayTotalPrice(totalPrice: number) {
  const totalPriceElement = document.getElementById('total-price');
  if (totalPriceElement) {
    //이 부분이 표시되는 부분이다. 실질적으로 보이는 구역 
    totalPriceElement.innerText = `총액: ${totalPrice}원`;
  }
}
