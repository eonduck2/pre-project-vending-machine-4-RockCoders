export default interface IDrop {
  dropColumn(tableName: string, columnName: string | number): void;
}
