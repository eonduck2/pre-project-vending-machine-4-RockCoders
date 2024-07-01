import IReadRecord from "../../../interfaces/manipulation/select/ReadRecord.interface";
import IReadRecordsAll from "../../../interfaces/manipulation/select/ReadRecordsAll.interface";
import IReadRecordsAllByIndex from "../../../interfaces/manipulation/select/ReadRecordsAllByIndex.interface";

export default interface IReadData
  extends IReadRecord,
    IReadRecordsAll,
    IReadRecordsAllByIndex {}
