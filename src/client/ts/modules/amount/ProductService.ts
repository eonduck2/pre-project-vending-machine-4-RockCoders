export class ProductService {
  async fetchProducts(): Promise<Array<{ id: number, name: string, price: number }>> {
    const response = await fetch('/products');
    const data = await response.json();
    if (!data.products) {
      throw new Error('제품 정보가 응답 데이터에 없습니다.');
    }
    return data.products;
  }
}