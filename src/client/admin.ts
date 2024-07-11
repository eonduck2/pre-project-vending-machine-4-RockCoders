import CreateFormManager from "./ts/modules/addProduct/createFormManager.js";
import { UIManager } from "./ts/modules/adminList.js";
import DeleteFormManager from "./ts/modules/deleteProduct/deleteFormManager.js";
import ReportButtonManager from "./ts/modules/reportHandle/reportButtonManager.js";

import UpdateFormManager from "./ts/modules/updateProduct/updateFormManager.js";



document.addEventListener('DOMContentLoaded', () => {
  const uiManager = new UIManager();

  // 서버에서 제품 목록을 가져오기
  fetch('/products')
    .then(response => response.json())
    .then(products => {
      uiManager.displayProducts(products);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  new CreateFormManager();
  new UpdateFormManager();
  new DeleteFormManager();
  new ReportButtonManager();
});

