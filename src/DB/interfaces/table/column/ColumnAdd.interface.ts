export default interface IColumnAdd {
  addColumn(
    tableName: string,
    columnName: string | number,
    columnType: string
  ): void;
}
