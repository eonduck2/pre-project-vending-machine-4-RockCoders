/**
 * * fetch의 기능을 수행하는 class
 */
export class ProductService {
  async fetchProducts(): Promise<Array<{ id: number, name: string, price: number }>> {
    try{
      const response = await fetch('/products');
      if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (!data.products) {
        throw new Error('제품 정보가 응답 데이터에 없습니다.');
      }
      return data.products;
    } catch (error){
      console.error('제품 정보를 가져오는 중 오류 발생:', error);
      throw error;
    }
  }
}
