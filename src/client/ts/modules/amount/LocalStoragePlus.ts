import LocalStorageModel from "../../../../localStorage/localStorage.js";


export class LocalStoragePlus {
  private storageManager: LocalStorageModel;
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
    const item = localStorage.getItem(key);
    return item ? parseInt(item, 10) : 0;
  }

  setItem(key: string, value: number): void {
    localStorage.setItem(key, value.toString());
  }

  updateBalance(amount: number): number {
    let currentBalance = this.getItem('balance');
    currentBalance += amount;
    this.setItem('balance', currentBalance);
    return currentBalance;
  }
}