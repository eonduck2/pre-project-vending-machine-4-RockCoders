import LocalStorageModel from '../../../../localStorage/localStorage.js'

export class UIManager {
  
  /**
   * @moonhr 24.06.26
   * * 페이지 로드 시 LocalStorage에 저장된 잔액을 화면에 표시하는 메서드
   */
  displayBalance(): void {
    // 잔액 출력 로직
    const balanceElement = document.getElementById('balance') as HTMLParagraphElement;
    // LocalStorageModel 인스턴스 생성
    const storageManager = new LocalStorageModel();
    // 로컬 스토리지에서 'balance' 키에 해당하는 값을 가져옴
    const balance: number | null = storageManager.getItem("balance");
    // 잔액이 null이 아닌 경우 요소에 잔액을 문자열로 변환하여 표시
    if (balance !== null) {
      balanceElement.innerText = balance.toString();
    }
  }

  /**
   * @moonhr 24.06.28
   * * menu를 추가하는 메서드
   * @param products 제품 목록을 나타내는 객체 배열
   * @param currentBalance 현재 잔액을 나타내는 숫자
   */
  displayProducts(products: Array<{ id: number, name: string, price: number }>, currentBalance: number): void {
    const menuContent = document.getElementById('menu-content') as HTMLDivElement;
    menuContent.innerHTML = '';
    products.forEach(product => {
      if (product.price <= currentBalance) {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
          <div class="w-full h-44 flex flex-col items-center bg-gray-300 relative">
            <div class="text-base w-4/5 overflow-auto absolute top-1/4">${product.id}</div>
            <div class="text-base w-4/5 overflow-auto absolute top-2/4">${product.name}</div>
            <div class="w-4/5 h-7 rounded-full bg-white absolute top-2/3 flex justify-center items-center">${product.price}</div>
          </div>
        `;
        menuContent.appendChild(productDiv);
      }
    });
  }

  showAlert(message: string): void {
    alert(message);
  }
}