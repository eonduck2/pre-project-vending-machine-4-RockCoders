import hideAllForms from "../hideAllForms.js";
import showReportContainer from "./showReportContainer.js";

/**
 * @crystal23733 24.07.08
 * * 보고서 버튼을 핸들링 하는 함수
 */
export default class ReportButtonManager {
  constructor() {
    const reportBtn = document.getElementById("adminReportBtn");
    reportBtn?.addEventListener("click", async () => {
      hideAllForms(); // 모든 폼을 숨기기
      showReportContainer(); // 보고서 컨테이너를 보이게 하기
    });
  }
}