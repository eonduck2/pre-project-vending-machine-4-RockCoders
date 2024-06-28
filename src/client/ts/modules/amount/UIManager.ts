export class UIManager {

  displayBalance(): void {
    // 잔액 출력 로직
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
  /**
   * @moonhr 24.06.28
   * * 조건에 맞지 않을 때 출력될 메세지
   * @param message 
   */
  showAlert(message: string): void {
    alert(message);
  }
}