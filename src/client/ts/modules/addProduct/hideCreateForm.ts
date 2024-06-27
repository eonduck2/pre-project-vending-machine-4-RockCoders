/**
 * 2024.06.27 @crystal23733
 * *createFormContainer div를 숨기는 함수
 */

export default () => {
  const createFormContainer = document.getElementById('create-form-container');
  if (createFormContainer) {
      createFormContainer.classList.add('hidden');
  }
};