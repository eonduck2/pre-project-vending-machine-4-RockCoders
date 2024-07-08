import hideAllForms from "../hideAllForms";
import showReport from "./showReport";

/**
 * @crystal23733 24.07.08
 * * 보고서 출력 버튼을 핸들링하는 함수
 */
export default class ReportBtnManager {
  constructor(){
    const reportBtn = document.getElementById('adminReportBtn') as HTMLElement;
    reportBtn?.addEventListener('click', () => {
      hideAllForms();
      showReport();
    })
  }
}