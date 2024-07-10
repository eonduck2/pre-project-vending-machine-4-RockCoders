/** 
 * @yuxincxoi 24.07.10
 * * 제품의 총액을 계산하여 표시한다.
 * @param target 선택한 제품
 */

let total = 0;

export default (target: HTMLElement) => {
  try {
    // * 선택된 제품의 가격을 숫자 형식으로 불러오기
    const productPrice = target.querySelector(".rounded-full")!.textContent;
    if(productPrice){
      const price = parseFloat(productPrice);
      
      // price가 숫자 형식이면
      if (!isNaN(price)) {
        // * total에 선택한 제품의 가격 누적 계산
        total += price;
        // * 계산된 총액이 존재한다면
        if(total){
          // * 총액 출력
          const totalPrice = document.getElementById("total-price");
          if (totalPrice) {
            totalPrice.innerHTML = total.toString();
          }
        }
      } else {
        console.log('가격 변환에 실패했습니다.');
      }
    } else {
      console.log('가격 정보를 찾을 수 없습니다.');
    }
  } catch(error) {
    console.log('제품 정보를 가져오는 데에 실패했습니다.');
  }
}