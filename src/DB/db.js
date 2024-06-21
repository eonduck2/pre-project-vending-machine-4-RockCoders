import sqlite3 from "sqlite3";

// * sqlite3 객체와 같은 기능을 하지만, 디버깅에 더 유리한 옵션을 포함한 verbose mode로 선언
const sqlite3VM = sqlite3.verbose();

import DataBaseManager from "./modules/DataBaseManager.js";

const test = new DataBaseManager(`123.db`);

const columns = [
  { name: "id", type: "INTEGER PRIMARY KEY AUTOINCREMENT" },
  { name: "name", type: "TEXT" },
  { name: "email", type: "TEXT" },
  { name: "age", type: "INTEGER" },
];

const newUser = {
  name: "김씨",
  email: "alice@example.com",
  age: 28,
};

// test.tableCreator(`test_tbl`, columns);
test.createRecord(`test_tbl`, newUser);
// const test4 = test.readRecord(`test_tbl`, "name", `test`, true);

// console.log(`테스트2: ${test2}`);
// const test2 = test.getAllRecords(`test_tbl`);

const updateData = { age: 30, city: "New York" };
test.updateRecord(`test_tbl`, `name`, `Alice`, updateData);

test.readRecordsAll(`test_tbl`, true);

// const testF = async () => {
//   test2.then((data) => {
//     console.log(data);
//   });
//   console.log(await test4);
// };

// testF();
