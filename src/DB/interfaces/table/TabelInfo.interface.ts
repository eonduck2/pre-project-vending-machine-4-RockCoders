export default interface IReadTableInfo {
  getTableInfo(tableName: string, log?: boolean): Promise<Array<object>>;
}
