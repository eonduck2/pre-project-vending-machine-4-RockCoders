import LocalStorageModel from '../../localStorage/localStorage.js';

/**
 * @yuxincxoi 24.06.24
 * * 구매하기 버튼 클릭 시 호출될 함수
 * * 로컬스토리지에서 잔액 가져와서 출력
 */

// * 로컬스토리지 객체 생성
const localData = new LocalStorageModel();

const getBalance = () => {
  try {
    // * 로컬스토리지에서 잔액 가져오기
    let balance = localData.getItem('balance');
  } catch (error) {
    console.error('로컬스토리지에 데이터를 저장하는 중 오류가 발생했습니다:', error);
  }
}

// todo : balance 출력

export default getBalance();