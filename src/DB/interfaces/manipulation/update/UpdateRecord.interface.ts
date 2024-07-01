export default interface IUpdateRecord {
  updateRecord(
    tableName: string,
    whereColumn: string | number,
    whereValue: string | number,
    updateData: object
  ): void;
}
