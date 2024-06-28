import LocalStorageModel from '../../../../localStorage/localStorage.js'

/**
 * @moonhr 24.06.26
 * * 페이지 로드 시 LocalStorage에 저장된 잔액을 화면에 표시하는 함수
 */
export default() => {
  const balanceElement = document.getElementById('balance') as HTMLParagraphElement;

    // LocalStorageModel 인스턴스 생성
  const storageManager = new LocalStorageModel();

    // 로컬 스토리지에서 'balance' 키에 해당하는 값을 가져옴
  const balance : number | null = storageManager.getItem("balance");

  // 잔액이 null이 아닌 경우 요소에 잔액을 문자열로 변환하여 표시
  if(balance !== null){
    balanceElement.innerText = balance.toString();
  }
} 