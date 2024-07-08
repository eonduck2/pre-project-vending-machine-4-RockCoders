import hideAllForms from "../hideAllForms.js";
import hideReportContainer from "./hideReportContainer.js";
import showReportContainer from "./showReportContainer.js";

/**
 * @crystal23733 24.07.08
 * * 보고서 버튼을 핸들링 하는 함수
 */
export default class ReportButtonManager {
  private reportContainer: HTMLElement;

  constructor() {
    this.reportContainer = document.getElementById("report-container") as HTMLElement;
    const reportBtn = document.getElementById("adminReportBtn");
    reportBtn?.addEventListener("click", this.toggleReport);
  }

  private toggleReport = (): void => {
    if (this.reportContainer.classList.contains("hidden")) {
      hideAllForms(); // 모든 폼을 숨기기
      showReportContainer(); // 보고서 컨테이너를 보이게 하기
    } else {
      hideReportContainer(); // 보고서 컨테이너 숨기기
    }
  };
}