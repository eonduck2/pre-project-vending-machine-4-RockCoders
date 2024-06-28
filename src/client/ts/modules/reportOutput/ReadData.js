export default class ReadData {
  constructor(dbConnector) {
    this.dbConnector = dbConnector;
  }

  async readRecordsAll(table) {
    // 실제 데이터베이스에서 데이터를 읽어오는 로직이 들어갈 수 있습니다.
    // 여기서는 테스트를 위한 더미 데이터를 반환합니다.
    return [
      { name: 'Product A', price: 100 },
      { name: 'Product B', price: 150 },
      { name: 'Product A', price: 100 },
      { name: 'Product A', price: 100 },
      { name: 'Product A', price: 100 },
      { name: 'Product A', price: 100 },
      { name: 'Product A', price: 100 },
      { name: 'Product C', price: 200 },
      { name: 'Product B', price: 150 }
    ];
  }

  close() {
    // 실제 데이터베이스 연결 닫기 로직이 들어갈 수 있습니다.
    this.dbConnector.close();
  }
}