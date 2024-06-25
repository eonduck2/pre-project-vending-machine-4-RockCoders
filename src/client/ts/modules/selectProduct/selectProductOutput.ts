// * 선택한 제품 출력하는 함수


export function displaySelectedProducts(selectedProducts: { name: string, price: number }[]) {
  const productListElement = document.getElementById('total-price');
  if (productListElement) {
    productListElement.innerHTML = ''; // 기존 목록 삭제
    selectedProducts.forEach(product => {
      const li = document.createElement('li');
      li.textContent = `${product.name} : ${product.price}원`;
      productListElement.appendChild(li);
    });
  }
}