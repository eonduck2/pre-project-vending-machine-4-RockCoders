/**
 * @moonhr 24.06.26
 * * 매개변수를 검사해 1000이상 10000이하만 참을 출력하는 함수
 * @param money
 * @returns 
 */
export function validateAmount(money : number) {
  const minMoney = 1000;
  const maxMoney = 10000;

  if (money >= minMoney && money <= maxMoney) {
    return true;
  } else {
    return false;
  }
}