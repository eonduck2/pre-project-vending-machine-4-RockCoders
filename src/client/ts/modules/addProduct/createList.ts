// * 제품정보가 업데이트되면 리스트를 추가해주는 함수
const sqlite3 = require('sqlite3');

const createDatabase : Function = ():void=>{
  const db = new sqlite3.Database('./test.db');

  // const createQuery = db.prepare("CREATE TABLE team4 (id TEXT PRIMARY KEY, )");


}