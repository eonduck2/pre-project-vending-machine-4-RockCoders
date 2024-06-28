// * 입금하기 버튼 누르면 실행 될 함수 === 제품정보 출력하는 파일 
import validateAmount from "./validateAmount.js";
import displayBalance from "./displayBalance.js";
import LocalStorageModel from '../../../../localStorage/localStorage.js'

/**
 * @moonhr 24.06.26
 * * 버튼 클릭 시 로컬에 값 저장하고 출력함. money-button클릭시 실행.
 */
export async function priceInput() {
  const moneyInput = document.getElementById('money-input') as HTMLInputElement;

  //문자열로 들어온 값을 숫자로 반환함.
  const money = parseInt(moneyInput.value, 10);

  console.log('일단 함수 실행중');

  //input으로 들어온 값 검사하여 참일 때 실행
  if (validateAmount(money)) {
    const storageManager = new LocalStorageModel();
    //로컬스토리지.balance값 가져오기
    let currentBalance: number | null = storageManager.getItem("balance")!;
    //값 추가
    currentBalance += money;
    //값 저장
    storageManager.setItem('balance', currentBalance);
    //값 출력
    displayBalance();

    try {
      // 서버로부터 제품 정보 가져오기
      const response = await fetch('/products');  // 서버의 /products 경로로 GET 요청
      const data = await response.json();

      if (!data.products) {
        throw new Error('제품 정보가 응답 데이터에 없습니다.');
      }
      const products = data.products;
      const menuContent = document.getElementById('menu-content') as HTMLDivElement;
      menuContent.innerHTML = '';

      type productType = {
        id : number,
        name : string,
        price : number
      }

      // 각 제품을 div 요소로 추가
      products.forEach((product : productType) => {
        if (product.price <= currentBalance) {

          //todo id 태그에 넣어주기!!!
          const productId: number = product.id;
          const productName: string = product.name;
          const productPrice: number = product.price;

          const productDiv = document.createElement('div');
          productDiv.textContent = `<div class="w-full h-44 flex flex-col items-center bg-gray-300 relative">
          <div class="text-base w-4/5 overflow-auto absolute top-1/4">${productId}</div>
          <div class="text-base w-4/5 overflow-auto absolute top-2/4">${productName}</div><div class="w-4/5 h-7 rounded-full bg-white absolute top-2/3 flex justify-center items-center">${productPrice}</div>`

          menuContent.appendChild(productDiv)
        }
      });
    }
    catch (error) { console.error('제품 정보를 가져오는 중 오류 발생:', error); }
  } else {
    alert('입력된 값이 옳지 않습니다. 1000원 이상 10000원 이하만 입금 가능합니다.');
  }
};
