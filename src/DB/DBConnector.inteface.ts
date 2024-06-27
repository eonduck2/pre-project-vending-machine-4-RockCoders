import IDB from "./interfaces/Db.interface";
import IFileWithPath from "./interfaces/FileWithPath.interface";
import IClose from "./interfaces/Close.inteface";

export default interface IDBConnector {
  db: IDB;
  fileWithPath: IFileWithPath;
  close(): IClose;
}
