import { UIManager } from "../amount/UIManager.js";

/**
 * @yuxincxoi 24.06.27
 * * 구매하기 버튼 클릭 시 호출될 함수
 * * 잔액 계산해서 로컬스토리지에 저장하고 출력하는 함수
 */


export default () => {
  // * 입금액과 잔액 가져오기
  const amountElement = document.getElementById('balance')?.innerHTML;
  const totalPriceElement = document.getElementById('total-price')?.innerHTML;
  if (amountElement && totalPriceElement) {
    const amount = parseInt(amountElement);
    const totalPrice = parseInt(totalPriceElement);
    
    // * 잔액 계산 : 입금액 - 구매금액
    const getBalance = amount - totalPrice;
    
    const uiManager = new UIManager();
    
    // * 선택한 제품이 없으면(구매금액이 존재하지 않으면)
    if(isNaN(getBalance)) {
      uiManager.errModal("선택한 제품이 없습니다. 제품을 선택해주세요.");
    } else {
      // * 로컬스토리지에 잔액 저장
      localStorage.setItem("balance", String(getBalance));
      
      // * 잔액 출력 함수 호출
      uiManager.displayBalance();
    }
  }
}