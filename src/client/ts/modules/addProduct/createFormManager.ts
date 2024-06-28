/**
 * @crystal23733 24.06.28
 * * 제품 추가 버튼 핸들링
 */

import hideReportContainer from "../reportHandle/hideReportContainer.js";

export default class CreateFormManager {
  private createFormContainer: HTMLElement;

  constructor() {
    this.createFormContainer = document.querySelector("#create-form-container") as HTMLElement;
    const createBtn = document.getElementById("adminAddBtn");
    createBtn?.addEventListener("click", this.showCreateForm);
  }

  public showForm(): void {
    this.showCreateForm();
  }

  private showCreateForm = (): void => {
    // 숨겨진 다른 폼들을 숨기기
    document.querySelectorAll(".admin-form-container").forEach(container => {
      if (container !== this.createFormContainer) {
        container.classList.add("hidden");
      }
    });

    // 현재 폼 보이기
    this.createFormContainer.classList.remove("hidden");
    hideReportContainer();
  };
}