export default class UpdateFormManager {
  private updateFormContainer: HTMLElement;

  constructor() {
    this.updateFormContainer = document.querySelector("#update-form-container") as HTMLElement;
    const updateBtn = document.getElementById("adminUpdateBtn");
    updateBtn?.addEventListener("click", this.showUpdateForm);
  }

  private showUpdateForm = (): void => {
    // 숨겨진 다른 폼들을 숨기기
    document.querySelectorAll(".admin-form-container").forEach(container => {
      if (container !== this.updateFormContainer) {
        container.classList.add("hidden");
      }
    });

    // 현재 폼 보이기
    this.updateFormContainer.classList.remove("hidden");
  };
}