export default interface IReadRecordsAll {
  readRecordsAll(tableName: string, log?: boolean): Promise<Array<object>>;
}
