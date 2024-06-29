import getTable from "./src/DB/modules/table/GetTableInfo";

const TableInfoGetter = new getTable(`123.db`);

TableInfoGetter.getTableInfo(`test_tbl2`, true);
