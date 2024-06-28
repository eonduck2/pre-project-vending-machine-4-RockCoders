import IDB from "./interfaces/Db.interface";
import IFileWithPath from "./interfaces/FileWithPath.interface";
import IDBCloser from "./interfaces/Close.inteface";

// export default interface IDBConnector {
//   db: IDB;
//   fileWithPath: IFileWithPath;
//   close(): IDBCloser;
// }

export default interface IDBConnector extends IDB, IFileWithPath, IDBCloser {}
