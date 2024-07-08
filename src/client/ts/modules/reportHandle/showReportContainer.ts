/**
 * @crystal23733 24.06.28
 * * 보고서 영역 핸들링
 */

export default (): void => {
  document.querySelectorAll(".admin-form-container").forEach(container => {
    container.classList.add("hidden");
  });

  // 보고서 컨테이너를 보이게 합니다.
  const reportContainer = document.getElementById("report-container");
  if (reportContainer) {
    reportContainer.classList.remove("hidden");
  }
}