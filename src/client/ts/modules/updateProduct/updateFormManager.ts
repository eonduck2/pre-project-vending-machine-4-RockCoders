/**
 * @crystal23733 24.06.27
 * * 제품 수정 버튼 이벤트
 */

export default class UpdateFormManager {
  private updateForm: HTMLFormElement;

  constructor() {
    this.updateForm = document.querySelector("#update-form") as HTMLFormElement;
    const updateBtn = document.getElementById("adminUpdateBtn");
    updateBtn?.addEventListener("click", this.showUpdateForm);
  }

  private showUpdateForm = (): void => {
    this.hideAllForms();
    this.updateForm.classList.remove("hidden");
    this.updateForm.classList.add("bg-gray-300", "flex", "flex-col", "items-center", "relative", "h-full", "w-full");
  };

  private hideAllForms = (): void => {
    const forms = document.querySelectorAll("form");
    forms.forEach(form => {
      form.classList.add("hidden");
      form.classList.remove("flex", "bg-gray-300", "flex-col", "items-center", "relative", "h-full", "w-full");
    });
  };
}