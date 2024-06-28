import CreateFormManager from "./modules/addProduct/createFormManager.js";
import DeleteFormManager from "./modules/deleteProduct/deleteFormManager.js";
import UpdateFormManager from "./modules/updateProduct/updateFormManager.js";
import hideReportContainer from "./modules/reportHandle/hideReportContainer.js";
import toggleReportContainer from "./modules/reportHandle/toggleReportContainer.js";

document.addEventListener('DOMContentLoaded', () => {
  const createFormManager = new CreateFormManager();
  const updateFormManager = new UpdateFormManager();
  const deleteFormManager = new DeleteFormManager();

  const adminAddBtn = document.getElementById('adminAddBtn');
  const adminUpdateBtn = document.getElementById('adminUpdateBtn');
  const adminDeleteBtn = document.getElementById('adminDeleteBtn');
  const adminReportBtn = document.getElementById('adminReportBtn');

  if (adminAddBtn) {
    adminAddBtn.addEventListener('click', () => {
      createFormManager.showForm;
      hideReportContainer();
    });
  }

  if (adminUpdateBtn) {
    adminUpdateBtn.addEventListener('click', () => {
      updateFormManager.showForm();
      hideReportContainer();
    });
  }

  if (adminDeleteBtn) {
    adminDeleteBtn.addEventListener('click', () => {
      deleteFormManager.showForm();
      hideReportContainer();
    });
  }

  if (adminReportBtn) {
    adminReportBtn.addEventListener('click', () => {
      toggleReportContainer();
    });
  }
});