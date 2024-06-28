import IReadRecord from "../../interfaces/ReadRecord.interface";
import IReadRecordsAll from "../../interfaces/ReadRecordsAll.interface";
import IReadRecordsAllByIndex from "../../interfaces/ReadRecordsAllByIndex.interface";

export default interface IReadData
  extends IReadRecord,
    IReadRecordsAll,
    IReadRecordsAllByIndex {}
