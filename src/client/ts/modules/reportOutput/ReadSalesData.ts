import ReadData from "../../../../DB/modules/manipulation/ReadData.js";

// * ReadData 클래스를 사용하여 데이터베이스에서 데이터를 읽어오는 함수
const readSalesData = async (table: string): Promise<{ name: string; price: number }[]> => {
  const reader = new ReadData(table);// db위치
  try {
    const data = await reader.readRecordsAll(table);
    // console.log("5",data) - 혹시 어떻게 들어오는지 확인
    return data.map((row: any) => ({ name: row.name, price: row.price }));
  } finally {
    reader.close();
  }
};

export default readSalesData;