export default interface IRestoreDB {
  restoreDBFromBackup(backupDbFilePath: string, tableName: string): void;
}
