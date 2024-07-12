//* 입금하기 버튼 클릭 진행 될 함수
import validateAmount from "./validateAmount.js";
import { LocalStoragePlus } from "./LocalStoragePlus.js";
import { ProductService } from "./ProductService.js";
import { UIManager } from "./UIManager.js";

export async function priceInput() {
  console.log("또롱");

  const moneyInput = document.getElementById("money-input") as HTMLInputElement;
  const money = parseInt(moneyInput.value, 10);

  if (!validateAmount(money)) {
    const uiManager = new UIManager();
    uiManager.errorModal(
      "입력된 값이 옳지 않습니다. 1000원 이상 10000원 이하만 입금 가능합니다."
    );
    return;
  }

  const storageManager = new LocalStoragePlus();
  const currentBalance = storageManager.updateBalance(money);

  const uiManager = new UIManager();
  uiManager.displayBalance();

  try {
    const productService = new ProductService();
    const products = await productService.fetchProducts();
    uiManager.displayProducts(products, currentBalance);
  } catch (error) {
    console.error("제품 정보를 가져오는 중 오류 발생:", error);
  }
}
