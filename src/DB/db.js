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
};

test.createIndex("idx_users_name", "test_tbl", "name");
test.getTableInfo(`test_tbl`, true);
// test.getDBSize();
// test.

// const whereColumn = "name";
// const whereValue = "Bob";

// const newColumnName = "email";
// const newColumnType = "TEXT";
// test.deleteRecordsAll(`test_tbl`);
// test.dropColumn(`test_tbl`, `email`);
// test.addColumn(`test_tbl`, newColumnName, newColumnType);
// test.tableCreator(`test_tbl`, columns);
// test.restoreDataFromBackup("123456.db", `test_tbl`);
// test.
// test.tableCreator(`test_tbl4`, columns);
// test.createRecord(`test_tbl`, newUser);
// console.log(test.serialize);
// test.db.serialize(() => {});

// test.db.serialize(() => {
//   test.optimizeDatabase();
//   test.getDatabaseSize();

//   test.optimizeDatabase();
//   test.close();

//   test.getDatabaseSize();
//   test.getDatabaseSize();
//   // test.close();
//   // test.getDatabaseSize();
// });
// test.serialize(() => {
//   test.readRecord(`test_tbl`, `name`, `김씨`, true);
//   test.createRecord(`test_tbl`, newUser);
//   test.readRecordsAll(`test_tbl`, true);
// });

// console.log(
//   test.serialize(() => {
//   })
// );
// test.optimizeDatabase(true);
// test.readRecord(`test_tbl`, "name", `Alice`, true);

// test.

// const test4 = test.readRecord(`test_tbl`, "id", `1`, true);
// console.log(`테스트2: ${test2}`);
// const test2 = test.getAllRecords(`test_tbl`);
// const test123 = test.getTableInfo(`test_tbl`);
// test.readRecordsAll(`test_tbl`, true);

// test.
// test.dropColumn(`test_tbl`, `name`);
// test.deleteRecord(`test_tbl`, `test`, `test`);
// test.deleteRecordsAll(`test_tbl`);
// test.close();
// test.deleteRecord(`test_tbl`, `id`, `4`);
// const updateData = { age: 444, email: "teorr" };
// test.updateRecord(`test_tbl`, `id`, `24`, updateData);
// test.backupDB(`123.db`);

// test.updateRecord(`test_tbl`, `id`, `3`, { name: `444`, email: "teorr" });
// test.readRecordsAll(`test_tbl`, true);

// test.readRecordsAll(`test_tbl123`, true);

// const testF = async () => {
//   test123.then((data) => {
//     console.log(data);
//   });
// };

// testF();
