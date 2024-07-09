import hideAllForms from "../hideAllForms.js";
import hideReportContainer from "../reportHandle/hideReportContainer.js";
import showReportContainer from "../reportHandle/showReportContainer.js";

/**
 * @crystal23733 24.06.28
 * * 제품 추가 버튼 핸들링
 */

export default class CreateFormManager {
  private createFormContainer: HTMLElement;

  constructor() {
    this.createFormContainer = document.querySelector("#create-form-container") as HTMLElement;
    const createBtn = document.getElementById("adminAddBtn");
    createBtn?.addEventListener("click", this.toggleForm);
  }

  public showForm(): void {
    hideAllForms();
    this.createFormContainer.classList.remove("hidden");
    hideReportContainer();
  }

  public hideForm(): void {
    this.createFormContainer.classList.add("hidden");
  }

  private toggleForm = (): void => {
    if (this.createFormContainer.classList.contains("hidden")) {
      this.showForm();
    } else {
      this.hideForm();
    }
  };
}