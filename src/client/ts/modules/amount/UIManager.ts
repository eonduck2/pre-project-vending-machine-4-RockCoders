import LocalStorageModel from "../../../../localStorage/localStorage.js";
import { formData } from "../../../../modules/interface/formData.js";

/**
 * * ui관련의 기능을 모두 수행하는 class
 */
export class UIManager {
  //클래스 내부에서만 접근 가능한 속성이나 메서드
  private storageManager: LocalStorageModel;
  //객체가 생성될 때 자동으로 호출되어 초기화를 수행하는 메서드
  constructor() {
    this.storageManager = new LocalStorageModel();
  }

  /**
   * @moonhr 24.07.01
   * * 페이지 로드 시 LocalStorage에 저장된 잔액을 화면에 표시하는 메서드
   */
  displayBalance(): void {
    const balanceElement = document.getElementById(
      "balance"
    ) as HTMLParagraphElement;
    const balance: number | null = this.storageManager.getItem("balance");
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
  displayProducts(products: formData[], currentBalance: number): void {
    const menuContent = document.getElementById(
      "menu-content"
    ) as HTMLDivElement;
    menuContent.innerHTML = "";
    products.forEach((product) => {
      if (product.price <= currentBalance) {
        const productDiv = document.createElement("div");
        productDiv.innerHTML = `
          <div class="menu-item w-full h-44 flex flex-col items-center bg-gray-300 relative">
            <div class="text-base w-4/5 overflow-auto absolute top-1/10">${product.id}</div>
            <div class="text-base w-4/5 overflow-auto absolute top-1/4">${product.name}</div>
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
  errorModal(message: string): void {
    const root = document.getElementById("root");

    if (root instanceof HTMLElement) {
      const errModal = document.createElement("div");

      errModal.style.width = "100%";
      errModal.style.height = "100%";
      errModal.style.position = "absolute";

      root.insertBefore(errModal, root.firstChild);

      errModal.innerHTML = `
    <div class="flex w-full h-full">
      <div class="flex flex-col w-1/2 h-1/2 bg-slate-500"></div>
    </div>`;
    }
  }
}
