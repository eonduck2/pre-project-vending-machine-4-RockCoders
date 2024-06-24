import { LocalStorage } from 'node-localstorage';
const localStorage = new LocalStorage();

class LocalStorageModel {
  constructor() {
    this.validKeys = ["totalPrice", "amount", "balance"];
  }

  // * 유효한 키인지 확인
  isValidKey(key) {
    return this.validKeys.includes(key);
  }

  /**
   * @yuxincxoi 24.06.24
   * * 로컬스토리지에 데이터 저장
   * @param {string} key totalPrice||amount||balance
   * @param {number} value 총액||입금액||잔액
   */
  setItem(key, value) {
    if (this.isValidKey(key)) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      console.error(`Invalid key: ${key}.`);
    }
  }

  /**
   * @yuxincxoi 24.06.24
   * * 로컬스토리지에서 데이터 가져오기
   * @param {string} key totalPrice||amount||balance
   */
  getItem(key) {
    if (this.isValidKey(key)) {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } else {
      console.error(`Invalid key: ${key}.`);
      return null;
    }
  }

  /**
   * @yuxincxoi 24.06.24
   * * 로컬스토리지에서 데이터 삭제
   * @param {string} key totalPrice||amount||balance
   */
  removeItem(key) {
    if (this.isValidKey(key)) {
      localStorage.removeItem(key);
    } else {
      console.error(`Invalid key: ${key}.`);
    }
  }

  /**
   * @yuxincxoi 24.06.24
   * * 로컬스토리지의 모든 데이터 삭제
   */
  clear() {
    localStorage.clear();
  }
}

export default LocalStorageModel;

// const localData = new LocalStorageModel();
// localData.setItem('totalPrice', 3000);
