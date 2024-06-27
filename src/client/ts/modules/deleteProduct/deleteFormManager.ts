/**
 * @crystal23733 24.06.27
 * * 제품 삭제 버튼 이벤트
 */

export default class DeleteFormManager {
  private deleteForm: HTMLFormElement;

  constructor() {
    this.deleteForm = document.querySelector("#delete-form") as HTMLFormElement;
    const deleteBtn = document.getElementById("adminDeleteBtn");
    deleteBtn?.addEventListener("click", this.showDeleteForm);
  }

  private showDeleteForm = (): void => {
    this.hideAllForms();
    this.deleteForm.classList.remove("hidden");
    this.deleteForm.classList.add("bg-gray-300", "flex", "flex-col", "items-center", "relative", "h-full", "w-full");
  };

  private hideAllForms = (): void => {
    const forms = document.querySelectorAll("form");
    forms.forEach(form => {
      form.classList.add("hidden");
      form.classList.remove("flex", "bg-gray-300", "flex-col", "items-center", "relative", "h-full", "w-full");
    });
  };
}