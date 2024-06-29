export default interface IReordering {
  addColumn(
    tableName: string,
    columnName: string | number,
    columnType: string
  ): void;
}
