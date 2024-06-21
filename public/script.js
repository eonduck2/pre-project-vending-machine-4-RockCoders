// products.js
const productListEl = document.getElementById('product-list');

async function fetchProducts() {
  try {
    const response = await fetch('/api/products'); // 서버에서 제품 리스트를 받아옴
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const products = await response.json();
    renderProducts(products);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

function renderProducts(products) {
  productListEl.innerHTML = products.map(product => `
    <div class="border p-4 rounded-lg shadow">
      <h2 class="text-xl font-semibold">${product.name}</h2>
      <p class="mt-2">${product.price}원</p>
    </div>
  `).join('');
}

fetchProducts();