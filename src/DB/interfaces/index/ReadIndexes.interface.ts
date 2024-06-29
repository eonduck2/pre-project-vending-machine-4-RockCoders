export default interface IReadIndexes {
  getSomeIndexes(tableName: string, columnName: string | number): void;
}
