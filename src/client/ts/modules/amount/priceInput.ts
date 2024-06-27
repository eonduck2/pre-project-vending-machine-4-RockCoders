// * 입금하기 버튼 누르면 실행 될 함수 === 제품정보 출력하는 파일 
import { validateAmount } from "./validateAmount";
import { displayBalance } from "./displayBalance";
import LocalStorageModel from '../../../../localStorage/localStorage'

/**
 * @moonhr 24.06.26
 * * 버튼 클릭 시 로컬에 값 저장하고 출력함. money-button클릭시 실행.
 */
export function priceInput(){
  const moneyInput = document.getElementById('money-input') as HTMLInputElement;

  //문자열로 들어온 값을 숫자로 반환함.
  const money = parseInt(moneyInput.value, 10);

  //input으로 들어온 값 검사하여 참일 때 실행
  if(validateAmount(money)){
    const storageManager = new LocalStorageModel();
    //로컬스토리지.balance값 가져오기
    let currentBalance: number | null = storageManager.getItem("balance")!;
    //값 추가
    currentBalance += money;
    //값 저장
    storageManager.setItem('balance', currentBalance);
    //값 출력
    displayBalance();
  } else {
    alert('입력된 값이 옳지 않습니다. 1000원 이상 10000원 이하만 입금 가능합니다.');
  }
};