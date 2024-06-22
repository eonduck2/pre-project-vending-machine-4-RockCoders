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
  { name: "city", type: "INTEGER" },
];

const newUser = {
  name: "김씨",
  email: "alice@example.com",
  age: 28,
};
const whereColumn = "name";
const whereValue = "Bob";

// test.tableCreator(`test_tbl2`, columns);
// test.createRecord(`test_tbl`, newUser);
const test4 = test.readRecord(`test_tbl`, "id", `1`, true);
// test.readRecord(`test_tbl`, "name", `Alice`, true);
// console.log(`테스트2: ${test2}`);
// const test2 = test.getAllRecords(`test_tbl`);

// test.deleteRecord(`test_tbl`, `id`, `4`);
// const updateData = { age: 444, email: "teorr" };
// test.updateRecord(`test_tbl`, `id`, `1`, updateData);
// updateRecord(`test_tbl`, `id`, `1`, { age: 444, email: "teorr" });
// test.readRecordsAll(`test_tbl`, true);

// test.readRecordsAll(`test_tbl123`, true);

// const testF = async () => {
//   test2.then((data) => {
//     console.log(data);
//   });
//   console.log(await test4);
// };

// testF();
