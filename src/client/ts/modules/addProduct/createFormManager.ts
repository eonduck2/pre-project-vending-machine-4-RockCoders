/**
 * @crystal23733 24.06.27
 * * 제품 추가 버튼 이벤트
 */

export default class CreateFormManager {
  private createForm: HTMLFormElement;

  constructor() {
    this.createForm = document.querySelector("#create-form") as HTMLFormElement;
    const createBtn = document.getElementById("adminAddBtn");
    createBtn?.addEventListener("click", this.showCreateForm);
  }

  private showCreateForm = (): void => {
    this.hideAllForms();
    this.createForm.classList.remove("hidden");
    this.createForm.classList.add("bg-gray-300", "flex", "flex-col", "items-center", "relative", "h-full", "w-full");
  };

  private hideAllForms = (): void => {
    const forms = document.querySelectorAll("form");
    forms.forEach(form => {
      form.classList.add("hidden");
      form.classList.remove("flex", "bg-gray-300", "flex-col", "items-center", "relative", "h-full", "w-full");
    });
  };
}