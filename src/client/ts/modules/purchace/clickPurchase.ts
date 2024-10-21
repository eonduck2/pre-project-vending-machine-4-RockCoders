import balance from "./balance.js";
import removeList from "./removeList.js";

/**
 * @yuxincxoi 24.07.12
 * * 구매하기 버튼 클릭시 실행될 함수
 * * 1. 잔액 계산해서 로컬스토리지에 저장하고 출력
 * * 2. 장바구니 초기화
 */

export default () => {
  balance();
  removeList();
};
