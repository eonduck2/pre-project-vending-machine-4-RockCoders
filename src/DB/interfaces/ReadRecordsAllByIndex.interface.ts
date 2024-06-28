export default interface IReadRecordsAllByIndex {
  readRecordsAllByIndex(
    tableName: string,
    indexName: string,
    log?: boolean
  ): void;
}
