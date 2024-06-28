export default interface IReadRecord {
  readRecord(
    tableName: string,
    column: string | number,
    value: string | number,
    log?: boolean
  ): Promise<Array<object>>;
}
