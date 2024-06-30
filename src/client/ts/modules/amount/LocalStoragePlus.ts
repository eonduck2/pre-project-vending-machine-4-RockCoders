import LocalStorageModel from "../../../../localStorage/localStorage.js";


export class LocalStoragePlus {
  //클래스 내부에서만 접근 가능한 속성이나 메서드
  private storageManager: LocalStorageModel;
  //객체가 생성될 때 자동으로 호출되어 초기화를 수행하는 메서드
  constructor() {
    this.storageManager = new LocalStorageModel();
  }


  /**
   * @moonhr 24.06.28
   * * 로컬스토리지에서 값을 가져와 있으면 숫자로 파싱해 반환, 없으면 0 반환
   * @param key 로컬스토리지에서 가져올 항목의 키
   * @returns {number} 파싱된 값 또는 0
   */
  getItem(key: string): number {
    const item = this.storageManager.getItem(key);
    return item !== null ? item : 0;
  }

  /**
   * @moonhr 24.06.28
   * * 로컬스토리지에 값을 저장
   * @param key 로컬스토리지에 저장할 항목의 키
   * @param value 저장할 값
   */
  setItem(key: string, value: number): void {
    this.storageManager.setItem(key, value);
  }

  /**
   * @moonhr 24.06.28
   * * 현재 잔액에 금액을 더하고 저장한 후 업데이트된 잔액을 반환
   * @param amount 추가할 금액
   * @returns {number} 업데이트된 잔액
   */
  updateBalance(amount: number): number {
    let currentBalance = this.getItem('balance');
    currentBalance += amount;
    this.setItem('balance', currentBalance);
    return currentBalance;
  }
}