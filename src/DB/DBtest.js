import DBConnector from "./DBConnector.js";
import TableCreator from "./modules/table/TableCreator.js";
import ReadData from "./modules/manipulation/ReadData.js";
import createData from "./modules/manipulation/CreateData.js";

const reader = new ReadData(`test.db`);
const creator = new createData(`test.db`);

creator.createRecord(`test_tble`, { name: `테스트1` });
reader.readRecordsAll(`test_tble`, true);
