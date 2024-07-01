import { priceInput } from "./ts/modules/amount/priceInput.js";
import totalPriceOutput from "./ts/modules/selectProduct/totalPriceOutput.js";
import totalPrice from "./ts/modules/selectProduct/totalPrice.js";
import LocalStorageModel from "../localStorage/localStorage.js";

document.getElementById('money-button')?.addEventListener('click',priceInput);
const localStorageModel = new LocalStorageModel();
