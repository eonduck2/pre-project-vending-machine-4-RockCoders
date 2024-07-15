/**
 * @moonhr 24.07.10
 * @param target 선택된 event.target
 */
export function selectProductOutput(target: HTMLElement) {
  const productList = document.getElementById(
    "productList"
  ) as HTMLUListElement;

  try {
    // 선택된 메뉴 항목에서 데이터 가져오기
    const productName = target.querySelector(
      ".text-base:nth-child(2)"
    )!.textContent;
    const productPrice = target.querySelector(".rounded-full")!.textContent;

    // 새로운 li 요소를 생성하여 productList에 추가
    const cartItem = document.createElement("li");
    cartItem.className = 'cartLi';
    cartItem.textContent = `${productName} - ${productPrice}원`;
    productList.appendChild(cartItem);
  } catch (error) {
    console.error("제품 정보를 가져오는 중 오류 발생:", error);
  }
}
