import IFileWithPath from "./interfaces/FileWithPath.interface";
import IDBCloser from "./interfaces/Close.interface";
import ISerialize from "./interfaces/Serialize.interface";
import IParallelize from "./interfaces/Parallelize.interface";

export default interface IDBConnector
  extends IFileWithPath,
    IDBCloser,
    ISerialize,
    IParallelize {}
