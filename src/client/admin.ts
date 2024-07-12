import CreateFormManager from "./ts/modules/addProduct/createFormManager.js";
import { UIManager } from "./ts/modules/adminList.js";
import DeleteFormManager from "./ts/modules/deleteProduct/deleteFormManager.js";
import handleDeleteError from "./ts/modules/deleteProduct/handleDeleteError.js";
import ReportButtonManager from "./ts/modules/reportHandle/reportButtonManager.js";
import handleUpdateError from "./ts/modules/updateProduct/handleUpdateError.js";

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
  const updateForm = document.getElementById('update-form') as HTMLFormElement;
  const deleteForm = document.getElementById('delete-form') as HTMLFormElement;

  /**
   * @crystal23733 24.07.13
   * * 제품 수정, 삭제 시 HTML태그 핸들링하는 함수
   */
  if (updateForm) {
    updateForm.addEventListener('submit', handleUpdateError);
  }

  if (deleteForm) {
    deleteForm.addEventListener('submit', handleDeleteError);
  }
});

