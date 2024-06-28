import IFileWithPath from "./interfaces/FileWithPath.interface";
import IDBCloser from "./interfaces/Close.interface";

export default interface IDBConnector extends IFileWithPath, IDBCloser {}
