import creator from "./src/DB/modules/manipulation/insert/CreateData";
import getTable from "./src/DB/modules/table/GetTableInfo";
import adder from "./src/DB/modules/table/column/Addcolumn";
import dropper from "./src/DB/modules/table/column/DropColumn";
import reorderer from "./src/DB/modules/table/column/ReorderColumns";
import TransactionController from "./src/DB/modules/transaction/TransactionController";

const tController = new TransactionController(`123.db`);
// const testAdder = new adder(`123.db`);
// const testDropper = new dropper(`123.db`);
const testReorderer = new reorderer(`123.db`);
// const testCreator = new creator(`123.db`);
tController.beginTransaction(() => {
  testReorderer.reorderColumns(`test_tbl2`, { name: "TEXT", age: "INTEGER" });
});

// testCreator.createRecord(`test_tbl2`, { name: `만수`, age: 9999 });

// testReorderer.reorderColumns(`test_tbl2`, { age: "INTEGER", name: "TEXT" });

// const TableInfoGetter = new getTable(`123.db`);

// TableInfoGetter.getTableInfo(`test_tbl2`, true);
