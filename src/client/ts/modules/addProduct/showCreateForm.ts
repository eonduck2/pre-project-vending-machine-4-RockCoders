/**
 * @crystal23733 2024.06.27
 * * createFormContainer div를 나타내주는 함수
 */

export default () => {
  const createFormContainer = document.getElementById('create-form-container');
  if (createFormContainer) {
      createFormContainer.classList.remove('hidden');
  }
};
