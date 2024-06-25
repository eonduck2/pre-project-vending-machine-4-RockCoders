/** 
 * @jojayeon 24.06.25
 * * 선택한 제품 출력하는 함수
 * @param selectedProducts - 메뉴에 들어가 있는 객체 
 * @returns - selectedProducts 원래가져오 객체 리턴
 */

export default ((selectedProducts: { name: string, price: number }[]) => {
  const productListElement = document.getElementById('total-price');
  if (productListElement) {
    productListElement.innerHTML = ''; // 기존 목록 삭제
    selectedProducts.forEach(product => {
      const li = document.createElement('li');
      li.textContent = `${product.name} : ${product.price}원`;
      productListElement.appendChild(li);
    });

  }
  return selectedProducts
})