/**
 * * @jojayeon 24.06.25
 * * 총액 출력하는 함수
 * 저장해 놓은 총액 넘버를 가져와서 출력만 함
 * @param totalPrice - 총액 totalprice의 리턴값을 넣어준다. 또는 객체 변수 넣어주면됨  
 */
export default ((totalPrice: number, paymentAmount: number) => {
  const totalPriceElement = document.getElementById('total-price') as HTMLUListElement;
  const messageElement = document.getElementById('message') as HTMLParagraphElement;

  if (totalPriceElement) {
    if (paymentAmount < totalPrice) {
      if (messageElement) {
        messageElement.innerText = '금액을 더 넣어 주세요';
      } else {
        console.error('total-Price 없슈');
      }
    } else {
      totalPriceElement.innerText = `총액: ${totalPrice}원`;
      if (messageElement) {
        messageElement.innerText = '';
      }
    }
  } else {
    console.error('message 없슈');
  }
});
