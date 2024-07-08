/**
 * @crystal23733 24.07.08
 * * 보고서 출력 컨테이너를 보여주는 부분
 */
export default async function showReport() {
  const reportContainer = document.getElementById("report-container");
  if (reportContainer) {
    // * 더미 데이터
    reportContainer.innerHTML = `
      <h2>총 매출 보고서</h2>
      <p>총 매출 금액: 3000 원</p>
    `;
  }
}