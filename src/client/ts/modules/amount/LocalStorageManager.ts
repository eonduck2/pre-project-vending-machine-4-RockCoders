export class LocalStorageManager {
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