// fetchProductsList.js
async function fetchProductsList() {
  try {
    const res = await fetch('/productList'); // 서버에서 제품 리스트를 받아옴
    if (!res.ok) {
      throw new Error('Network res was not ok');
    }
    const products = await res.json();
    renderProducts(products);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

function renderProducts(products) {
  const list1000 = document.getElementById('1000list');
  const list5000 = document.getElementById('5000list');
  const list10000 = document.getElementById('10000list');

  // 각 리스트를 초기화
  list1000.innerHTML = '';
  list5000.innerHTML = '';
  list10000.innerHTML = '';

  products.forEach(product => {
    let listItem = document.createElement('li');

    //todo taliwindcss 수정필요
    listItem.className = "border p-4 rounded-lg shadow";
    
    listItem.innerHTML = `
      <h2 class="text-xl font-semibold">${product.name}</h2>
      <p class="mt-2">${product.price}원</p>
    `;

    if (product.price <= 1000) {
      list1000.appendChild(listItem);
    } else if (product.price <= 5000) {
      list5000.appendChild(listItem);
    } else {
      list10000.appendChild(listItem);
    }
  });
}

fetchProductsList();