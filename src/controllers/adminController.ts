import { Request, Response } from "express";
import path from 'path';
import __dirname from "../modules/__dirname.js";
import { formData } from "../modules/interface/formData.js";
import dbPath from "../DB/db.js";
import CreateData from "../DB/modules/manipulation/insert/CreateData.js";
import UpdateData from "../DB/modules/manipulation/update/UpdateData.js";
import DeleteData from "../DB/modules/manipulation/delete/DeleteData.js";
import ReadData from "../DB/modules/manipulation/select/ReadData.js";

// * 관리자 페이지
export const admin = (req:Request, res:Response) => {
  return res.sendFile(path.join(__dirname, 'public/admin.html'));
}

// * 제품 추가
export const createDB = (req:Request, res:Response) => {
  const { name, price } = req.body as formData;
  const createProduct = new CreateData(dbPath);
  createProduct.createRecord('products', {
    name:name,
    price:price
  });
  createProduct.close();
  return res.redirect('/admin');
}

// * 제품 수정
export const updateDB = (req:Request, res:Response) => {
  const { id, name, price } = req.body as formData;
  const updateProduct = new UpdateData(dbPath);
  updateProduct.updateRecord('products', 'id', id, {
    name:name,
    price:price
  })
  updateProduct.close();
  return res.redirect('/admin');
}

// * 제품 삭제
export const deleteDB = (req:Request, res:Response) => {
  const { id } = req.body;
  const deleteProduct = new DeleteData(dbPath);
  deleteProduct.deleteRecord('products', 'id', id);
  deleteProduct.close();
  return res.redirect('/admin');
}

// * 보고서 출력
export const report = async(req:Request, res:Response) => {
  try {
    const readData = new ReadData(dbPath); // 데이터베이스 읽기 인스턴스 생성
    const historyData = await readData.readRecordsAll('history', false); // 'history' 테이블의 모든 레코드 읽기

    // 데이터 처리 로직
    let totalSales = 0; // 총 판매 금액을 저장할 변수
    const productCount: Record<string, number> = {}; // 각 제품의 판매 횟수를 저장할 객체

    // 모든 레코드를 순회하며 총 판매 금액과 각 제품의 판매 횟수를 계산
    (historyData as { name: string; price: number }[]).forEach((record) => {
      totalSales += record.price; // 각 레코드의 가격을 총 판매 금액에 더함
      if (productCount[record.name]) {
        productCount[record.name] += 1; // 이미 존재하는 제품이면 판매 횟수 증가
      } else {
        productCount[record.name] = 1; // 새로운 제품이면 판매 횟수를 1로 설정
      }
    });

    // 가장 많이 팔린 제품 찾기
    let mostSoldProduct = ''; // 가장 많이 팔린 제품 이름을 저장할 변수
    let maxCount = 0; // 가장 많이 팔린 제품의 판매 횟수를 저장할 변수
    for (const [product, count] of Object.entries(productCount)) {
      if (count > maxCount) {
        maxCount = count; // 현재 판매 횟수가 최대 판매 횟수보다 크면 업데이트
        mostSoldProduct = product; // 가장 많이 팔린 제품 이름 업데이트
      }
    }

    // 결과를 JSON 형식으로 응답
    res.json({ mostSoldProduct, totalSales });
  } catch (err) {
    console.error('Error generating report:', err); // 오류가 발생하면 콘솔에 로그 출력
    res.status(500).json({ error: 'Failed to generate report' }); // 500 상태 코드와 함께 오류 응답
  }
}