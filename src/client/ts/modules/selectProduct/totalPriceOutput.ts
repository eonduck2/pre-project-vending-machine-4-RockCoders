import totalPrice from "./totalPrice.js";

/**
 * @yuxincxoi 24.07.10
 * * 총액을 출력하는 함수
 * @param target 선택한 제품
 *
 */

export default (target: HTMLElement) => {
  let total = totalPrice(target)
  // * 계산된 총액이 존재한다면
  if(total){
    // * 총액 출력
    const totalPrice = document.getElementById("total-price");
    if (totalPrice) {
      totalPrice.innerHTML = total.toString();
    }
  }
}
