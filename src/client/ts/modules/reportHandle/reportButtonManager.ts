import hideAllForms from "../hideAllForms.js";
import hideReportContainer from "./hideReportContainer.js";
import showReportContainer from "./showReportContainer.js";

/**
 * @crystal23733 24.07.08
 * * 보고서 버튼을 핸들링 하는 함수
 */
export default class ReportButtonManager {
  private reportContainer: HTMLElement;
  private mostSoldProductElement: HTMLElement;
  private totalSalesElement: HTMLElement;

  constructor() {
    this.reportContainer = document.getElementById("report-container") as HTMLElement;

    // 새로 추가된 코드
    this.mostSoldProductElement = document.createElement("div");
    this.totalSalesElement = document.createElement("div");

    const reportBtn = document.getElementById("adminReportBtn");
    reportBtn?.addEventListener("click", this.toggleReport);
  }

  private toggleReport = (): void => {
    if (this.reportContainer.classList.contains("hidden")) {
      hideAllForms(); // 모든 폼을 숨기기
      this.fetchAndDisplayReport(); // 보고서 데이터 가져와서 표시하기
    } else {
      hideReportContainer(); // 보고서 컨테이너 숨기기
    }
  };

  private fetchAndDisplayReport = async (): Promise<void> => {
    try {
      const response = await fetch("/admin/report");
      if (!response.ok) {
        throw new Error("Failed to fetch report data");
      }
      const data = await response.json();

      // Clear previous content
      this.reportContainer.innerHTML = "";

      const mostSoldProductText = document.createElement("p");
      mostSoldProductText.textContent = "가장 많이 팔린 제품: ";
      const totalSalesText = document.createElement("p");
      totalSalesText.textContent = "총 판매 금액: ";

      this.mostSoldProductElement.textContent = data.mostSoldProduct;
      this.totalSalesElement.textContent = data.totalSales.toString();

      mostSoldProductText.appendChild(this.mostSoldProductElement);
      totalSalesText.appendChild(this.totalSalesElement);

      this.reportContainer.appendChild(mostSoldProductText);
      this.reportContainer.appendChild(totalSalesText);

      showReportContainer(); // 보고서 컨테이너를 보이게 하기
    } catch (error) {
      console.error("Error fetching or displaying report:", error);
      hideReportContainer();
    }
  };
}