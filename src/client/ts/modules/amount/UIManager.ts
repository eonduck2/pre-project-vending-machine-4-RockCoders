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
   * @eonduck2 24.07.11
   * * 조건에 맞지 않을 때 메시지와 함께 알림창 팝업
   * @param message 알림창을 통해 출력시킬 메시지
   */
  errModal(message: string): void {
    const root = document.getElementById("root");

    if (root instanceof HTMLElement) {
      const errModal = document.createElement("div");
      errModal.id = "errModal";

      const errModalStyles = [
        "w-full",
        "h-full",
        "absolute",
        "z-10",
        "flex",
        "justify-center",
        "items-center",
      ];

      errModal.style.backgroundColor = `rgb(181,181,181, 0.8)`;

      errModalStyles.forEach((styleClass) =>
        errModal.classList.add(styleClass)
      );

      root.insertBefore(errModal, root.firstChild);

      errModal.innerHTML = `
    <div class="flex rounded-xl flex-col bg-white w-1/4 h-1/4 border-2 border-solid border-black">
      <div class="w-full h-5 bg-black rounded-t-lg"></div>
      <div class="w-full h-5 flex mt-1">
        <div class="w-11/12 h-full flex items-center pl-3 gap-1">
          <i class="fa-solid fa-circle text-red-400 border-none"></i>
          <i class="fa-solid fa-circle text-orange-300 border-none"></i>
          <i class="fa-solid fa-circle text-green-400 border-none"></i>
        </div>
        <div class="w-5 h-full flex items-center justify-center">
          <i class="fa-solid fa-x cursor-pointer"></i>
        </div>
      </div>
      <div class="w-full h-5/6 flex justify-center items-center">
        <div class="break-all overflow-y-auto w-10/12 h-full flex justify-center items-center">
          <span>${message}</span>
        </div>
      </div>
    </div>`;
    }
  }
}
