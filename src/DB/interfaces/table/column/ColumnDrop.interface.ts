export default interface IColumnDrop {
  dropColumn(tableName: string, columnName: string | number): void;
}
