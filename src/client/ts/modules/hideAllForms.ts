/**
 * @crystal23733 24.06.28
 * * 어드민 페이지의 모든 form을 핸들링하는 함수
 */

export default () => {
  document.querySelectorAll(".admin-form-container").forEach(container => {
    container.classList.add("hidden");
  });
}