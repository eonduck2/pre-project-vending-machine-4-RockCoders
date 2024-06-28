export default interface ICreateRecord {
  createRecord(tableName: string, record: object): void;
}
