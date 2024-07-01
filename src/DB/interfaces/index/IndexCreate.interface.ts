export default interface IIndexCreate {
  createIndex(
    indexName: string,
    tableName: string,
    column: string | number
  ): void;
}
