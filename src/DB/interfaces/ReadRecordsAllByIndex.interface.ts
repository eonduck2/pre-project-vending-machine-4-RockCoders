export default interface IReadRecordsAll {
  readRecordsAll(tableName: string, indexName: string, log?: boolean): void;
}
