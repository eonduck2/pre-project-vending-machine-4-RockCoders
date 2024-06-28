/**
 * @crystal23733 24.06.28
 * * 제품 삭제 버튼 핸들링
 */

import hideReportContainer from "../reportHandle/hideReportContainer.js";
import showReportContainer from "../reportHandle/showReportContainer.js";

export default class DeleteFormManager {
  private deleteFormContainer: HTMLElement;

  constructor() {
    this.deleteFormContainer = document.querySelector("#delete-form-container") as HTMLElement;
    const deleteBtn = document.getElementById("adminDeleteBtn");
    deleteBtn?.addEventListener("click", this.showDeleteForm);
  }

  public showForm(): void {
    this.showDeleteForm();
    showReportContainer();
  }

  private showDeleteForm = (): void => {
    // 숨겨진 다른 폼들을 숨기기
    document.querySelectorAll(".admin-form-container").forEach(container => {
      if (container !== this.deleteFormContainer) {
        container.classList.add("hidden");
      }
    });

    // 현재 폼 보이기
    this.deleteFormContainer.classList.remove("hidden");
    hideReportContainer();
  };
}