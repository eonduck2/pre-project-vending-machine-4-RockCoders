/**
 * @crystal23733 24.06.28
 * * 보고서 영역 핸들링
 */

export default (): void => {
  const reportContainer = document.getElementById('reportContainer');
  if (reportContainer) {
    reportContainer.classList.add('hidden');
  }
}