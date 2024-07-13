import { formData } from "../../../modules/interface/formData";

/**
 * @crystal23733 24.07.11
 * * 제품 불러오는 함수
 * * UIManager.ts 파일 변형 함수
 */
export class UIManager {
  displayProducts(products: formData[]): void {
    const menuContent = document.getElementById("menu-content") as HTMLDivElement;
    menuContent.innerHTML = "";
    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.innerHTML = `
        <div class="menu-item w-full h-44 flex flex-col items-center bg-gray-300 relative">
          <div class="text-base w-4/5 overflow-auto absolute top-1/10">${product.id}</div>
          <div class="text-base w-4/5 overflow-auto absolute top-1/4">${product.name}</div>
          <div class="w-4/5 h-7 rounded-full bg-white absolute top-2/3 flex justify-center items-center">${product.price}</div>
        </div>
      `;
      menuContent.appendChild(productDiv);
    });
  }
}