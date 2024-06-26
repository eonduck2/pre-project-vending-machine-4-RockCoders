import DBConnector from "./DBConnector.js";
import TableCreator from "./modules/table/TableCreator.js";
import ReadData from "./modules/manipulation/ReadData.js";
import createData from "./modules/manipulation/CreateData.js";
import AddColumn from "./modules/table/column/AddColumn.js";
import DropColumn from "./modules/table/column/DropColumn.js";

const reader = new ReadData(`test.db`);
const creator = new createData(`test.db`);
const adder = new AddColumn(`test.db`);
const drop = new DropColumn(`test.db`);

// creator.createRecord(`test_tble`, { name: `테스트1` });
// reader.readRecordsAll(`test_tble`, true);

// adder.addColumn(`test_tble`, `age`, "TEXT");
drop.dropColumn(`test_tble`, `age`);
