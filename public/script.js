import { purchase } from "../src/controllers/purchase.js";

// * 구매하기 버튼
const purchaseBtn = document.getElementById("purchaseBtn");

// * 구매하기 버튼 click event
purchaseBtn.addEventListener("click", () => purchase());
