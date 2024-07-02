import { productsDTO } from '../../../productsDTO'

/**
 * * fetch의 기능을 수행하는 class
 */
export class ProductService {
  async fetchProducts(): Promise<productsDTO[]> {
    try{
      const response = await fetch('http://localhost:8080/products');
      
      if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (!data) {
        throw new Error('제품 정보가 응답 데이터에 없습니다.');
      }
      return data;
    } catch (error){
      console.error('제품 정보를 가져오는 중 오류 발생:', error);
      throw error;
    }
  }
}