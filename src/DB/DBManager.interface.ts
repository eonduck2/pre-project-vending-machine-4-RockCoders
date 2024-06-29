import IFileWithPath from "./interfaces/managing/FileWithPath.interface";
import IDBCloser from "./interfaces/managing/Close.interface";
import ISerialize from "./interfaces/managing/Serialize.interface";
import IParallelize from "./interfaces/managing/Parallelize.interface";
import IBeginTransaction from "./interfaces/transaction/BeginTransaction.interface";
import ICommitTransaction from "./interfaces/transaction/CommitTransaction.interface";
import IRollbackTransaction from "./interfaces/transaction/RollbackTransaction.interface";
import IOptimize from "./interfaces/managing/Optimize.interface";

export default interface IDBManager
  extends IFileWithPath,
    IDBCloser,
    ISerialize,
    IParallelize,
    IBeginTransaction,
    ICommitTransaction,
    IRollbackTransaction,
    IOptimize {}
