import { priceInput } from "./ts/modules/amount/priceInput.js";
import totalPriceOutput from "./ts/modules/selectProduct/totalPriceOutput.js";
import totalPrice from "./ts/modules/selectProduct/totalPrice.js";
import LocalStorageModel from "../localStorage/localStorage.js";
import { selectProductOutput } from "./ts/modules/selectProduct/selectProductOutput.js";

const localStorageModel = new LocalStorageModel();

// * 입금하기 버튼 이벤트
const moneyButton = document.getElementById("money-button");
if (moneyButton) {
  moneyButton.addEventListener("click", priceInput);
} else {
  console.error("money-button 요소를 찾을 수 없습니다.");
}

// * 장바구니 추가 이벤트
window.addEventListener("DOMContentLoaded", () => {
  const menuContent = document.getElementById("menu-content");
  if (menuContent) {
    menuContent.addEventListener("click", async (event) => {
      const target = event.target as HTMLElement;
      if (target && target.classList.contains("menu-item")) {
        await selectProductOutput(target);
      }
      totalPriceOutput(target);
    });
  }
});
