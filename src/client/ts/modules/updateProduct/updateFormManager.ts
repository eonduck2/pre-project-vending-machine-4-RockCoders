import hideAllForms from "../hideAllForms.js";
import hideReportContainer from "../reportHandle/hideReportContainer.js";
import showReportContainer from "../reportHandle/showReportContainer.js";

/**
 * @crystal23733 24.06.28
 * * 제품 수정 버튼 핸들링
 */
export default class UpdateFormManager {
  private updateFormContainer: HTMLElement;

  constructor() {
    this.updateFormContainer = document.querySelector("#update-form-container") as HTMLElement;
    const updateBtn = document.getElementById("adminUpdateBtn");
    updateBtn?.addEventListener("click", this.toggleForm);
  }

  public showForm(): void {
    hideAllForms();
    this.updateFormContainer.classList.remove("hidden");
    hideReportContainer();
  }

  public hideForm(): void {
    this.updateFormContainer.classList.add("hidden");
    showReportContainer();
  }

  private toggleForm = (): void => {
    if (this.updateFormContainer.classList.contains("hidden")) {
      this.showForm();
    } else {
      this.hideForm();
    }
  };
}