import IReadRecord from "../../../interfaces/manipulation/ReadRecord.interface";
import IReadRecordsAll from "../../../interfaces/manipulation/ReadRecordsAll.interface";
import IReadRecordsAllByIndex from "../../../interfaces/manipulation/ReadRecordsAllByIndex.interface";

export default interface IReadData
  extends IReadRecord,
    IReadRecordsAll,
    IReadRecordsAllByIndex {}
