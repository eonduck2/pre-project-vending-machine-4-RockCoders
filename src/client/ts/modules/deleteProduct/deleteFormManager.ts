import hideAllForms from "../hideAllForms.js";
import hideReportContainer from "../reportHandle/hideReportContainer.js";
import showReportContainer from "../reportHandle/showReportContainer.js";

/**
 * @crystal23733 24.06.28
 * * 제품 삭제 버튼 핸들링
 */
export default class DeleteFormManager {
  private deleteFormContainer: HTMLElement;

  constructor() {
    this.deleteFormContainer = document.querySelector("#delete-form-container") as HTMLElement;
    const deleteBtn = document.getElementById("adminDeleteBtn");
    deleteBtn?.addEventListener("click", this.toggleForm);
  }

  public showForm(): void {
    hideAllForms();
    this.deleteFormContainer.classList.remove("hidden");
    hideReportContainer();
  }

  public hideForm(): void {
    this.deleteFormContainer.classList.add("hidden");
  }

  private toggleForm = (): void => {
    if (this.deleteFormContainer.classList.contains("hidden")) {
      this.showForm();
    } else {
      this.hideForm();
    }
  };
}