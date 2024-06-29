import creator from "./src/DB/modules/manipulation/insert/CreateData";
import TableCreator from "./src/DB/modules/table/TableCreator";
import getTable from "./src/DB/modules/table/GetTableInfo";
import adder from "./src/DB/modules/table/column/Addcolumn";
import dropper from "./src/DB/modules/table/column/DropColumn";
import reorderer from "./src/DB/modules/table/column/ReorderColumns";
import CreateIndex from "./src/DB/modules/index/CreateIndex";
import DropIndex from "./src/DB/modules/index/DropIndex";
import GetIndexes from "./src/DB/modules/index/GetIndexes";
import BackUpDB from "./src/DB/modules/backup/BackUpNowDB";
import RestoreDBFromBackUp from "./src/DB/modules/backup/RestoreDBFromBackUp";

import DBManager from "./src/DB/DBMANAGER";
import GetDBSize from "./src/DB/modules/utilities/GetDBSize";
import ConstraintHelper from "./src/DB/modules/utilities/ConstraintHelper";

// const sizer = new GetDBSize(`123.db`);
// const test = new DBManager(`123.db`);
const testCon = ConstraintHelper.getDefaultConstraints();
testCon.primaryKey = true;
testCon.notNull = true;
testCon.type.TEXT = true;
// console.log(testCon);
const testGen = ConstraintHelper.generateConstraintString(testCon);
console.log(testGen);

// const BUDB = new BackUpDB(`123.db`);
// const RDBFBU = new RestoreDBFromBackUp(`123.db`);

// BUDB.backupDB(`1234.db`);
// RDBFBU.restoreDBFromBackup(`1234.db`, `test_tbl2`);

// const indexCreator = new CreateIndex(`123.db`);
// const indexDeleter = new DropIndex(`123.db`);
// indexDeleter.dropIndex(`test_age_index`);
// const indexGetter = new GetIndexes(`123.db`);

// indexCreator.createIndex(`test_name_index3`, `test_tbl2`, `name`);
// indexGetter.getAllIndexes(`test_tbl2`);
// indexDeleter.dropIndex(`test_index`);
// const tableCreator = new TableCreator(`123.db`);
// // const testAdder = new adder(`123.db`);
// // const testDropper = new dropper(`123.db`);
// const testReorderer = new reorderer(`123.db`);
// const testCreator = new creator(`123.db`);
// testReorderer.beginTransaction(() => {
//   testReorderer.serialize(() => {
//     // testReorderer.reorderColumns(`test_tbl2`, { name: "TEXT", age: "INTEGER" });
//     // testReorderer.reorderColumns(`test_tbl2`, { age: "INTEGER", name: "TEXT" });
//     // testReorderer.commitTransaction();
//     // testReorderer.rollbackTransaction();
//     testReorderer.reorderColumns(`test_tbl3`, { name: "TEXT", age: "INTEGER" });
//     testReorderer.rollbackTransaction();
//     // testReorderer.commitTransaction();
//     // testReorderer.reorderColumns(`test_tbl3`, { age: "INTEGER", name: "TEXT" });
//     // testReorderer.rollbackTransaction();
//     testReorderer.reorderColumns(`test_tbl2`, { name: "TEXT", age: "INTEGER" });
//     testReorderer.commitTransaction();
//   });
//   // testReorderer.rollbackTransaction();
// });

// tableCreator.createTable(`test_tbl3`, { name: "TEXT", age: "INTEGER" });
// testCreator.createRecord(`test_tbl3`, { name: `만수`, age: 9999 });

// testReorderer.reorderColumns(`test_tbl2`, { age: "INTEGER", name: "TEXT" });

// const TableInfoGetter = new getTable(`123.db`);

// TableInfoGetter.getTableInfo(`test_tbl2`, true);
