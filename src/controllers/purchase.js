/**
 * @yuxincxoi 24.06.20
 * * 구매하기 버튼 click 시에 실행될 함수입니다.
 */
export function purchase() {
  // todo 구매 서버요청하는 부분

  // * 로컬스토리지에 잔액 저장
  localStorage.setItem("balance", balance);
  console.log("구매하기 click");
}
