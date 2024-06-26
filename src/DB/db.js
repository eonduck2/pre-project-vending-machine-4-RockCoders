import DBConnector from "./DBManager.js";
import TableCreator from "./modules/table/TableCreator.js";
import DataManipulator from "./modules/manipulation/DataManipulator.js";
import DefineConstants from "./modules/utilities/DefineConstants.js";

// const connector = new DBConnector(`123.db`);
const Table = new TableCreator(`123.db`);
const manipulation = new DataManipulator(`123.db`);
const define = new DefineConstants();

// console.log(connector.createTable());
// console.log(DefineConstants.getDefaultConstants());
// console.log(manipulation.createRecord);
// console.log(Table.db);
// connector.createTable();
// connector.backupDB();

define.createIndex();
