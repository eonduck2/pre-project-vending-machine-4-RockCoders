import IFileWithPath from "./interfaces/managing/FileWithPath.interface";
import IDBCloser from "./interfaces/managing/Close.interface";
import ISerialize from "./interfaces/managing/Serialize.interface";
import IParallelize from "./interfaces/managing/Parallelize.interface";

export default interface IDBManager
  extends IFileWithPath,
    IDBCloser,
    ISerialize,
    IParallelize {}
