export default interface IDeleteRecord {
  deleteRecord(
    tableName: string,
    whereColumn: string | number,
    whereValue: string | number
  ): void;
}
