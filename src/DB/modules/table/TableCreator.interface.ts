export default interface ITableCreator {
  createTable(tableName: string, columns: object): void;
}
