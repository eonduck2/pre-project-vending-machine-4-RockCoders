import tableCreator from "./src/DB/modules/table/TableCreator2";
// const DBConnector = require(`./src/DB/DBConnector`);
// console.log(new DBConnector(`123.db`));

// const test = new DBConnector(`123.db`);
// console.log(test.fileWithPath);
// import test from "./test2";

// console.log(DBConnector);
// const sqlite3VM = require(`sqlite3`).verbose();
// const database = sqlite3VM.Database;
// console.log(database());

// console.log(test);

const testTable = new tableCreator(`123.db`);
// new tableCreator(`123.db`).createTable(`test_tbl`, { name: "TEXT" });

// testTable.serialize(() => {
//   testTable.close();
//   testTable.createTable(`test_tbl`, { name: "TEXT" });
//   testTable.close();
//   testTable.createTable(`test_tbl`, { name: "TEXT" });
//   testTable.close();
// });
