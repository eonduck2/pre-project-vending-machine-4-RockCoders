import CreateData from "../../DB/modules/manipulation/insert/CreateData";

/**
 * @yuxincxoi 24.06.25
 * * 구매하기 버튼 클릭 시 호출될 함수
 * * 판매된 내역을 저장하는 DB인 'History' 테이블을 생성하는 메서드와, User가 구매한 제품 각각의 제품 정보(제품명, 가격)를 테이블에 추가하는 메서드
 * @param {object} selectedProduct 선택한 제품 정보
 */


// todo : 선택한 제품 정보 인자로 받아오기
// * 임시 데이터 - 선택한 제품 정보
const selectedProduct = {
  name: "제품명",
  price: 5000
};

export default class HistoryTable {
  // * createHistory 인스턴스를 private 멤버 변수로 선언
  private createHistory: CreateData;

  constructor(dbFilePath: string) {
    this.createHistory = new CreateData(dbFilePath);
  }

  // * User가 구매한 제품 정보를 테이블에 추가하는 메서드
  createRecord(): void {
    this.createHistory.createRecord("history", selectedProduct);
  }
}