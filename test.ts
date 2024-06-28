import tableCreator from "./src/DB/modules/table/TableCreator";
import recordCreator from "./src/DB/modules/manipulation/CreateData";

const creator = new recordCreator(`123.db`);
const testTable = new tableCreator(`123.db`);

const testColumn = {
  name: `TEXT`,
  age: `INTEGER`,
};

const testData = {
  name: `이종수`,
  age: 99,
};

creator.serialize(() => {
  testTable.createTable(`test_tbl2`, testColumn);
  creator.createRecord(`test_tbl2`, testData);
});
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

// new tableCreator(`123.db`).createTable(`test_tbl`, { name: "TEXT" });

// testTable.serialize(() => {
//   testTable.createTable(`test_tbl`, { name: "TEXT" });
//   testTable.close();
//   testTable.createTable(`test_tbl`, { name: "TEXT" });
//   testTable.close();
// });
