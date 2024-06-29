import IFileWithPath from "./interfaces/managing/FileWithPath.interface.js";
import IDBCloser from "./interfaces/managing/Close.interface.js";
import ISerialize from "./interfaces/managing/Serialize.interface.js";
import IParallelize from "./interfaces/managing/Parallelize.interface.js";
import IBeginTransaction from "./interfaces/transaction/BeginTransaction.interface.js";
import ICommitTransaction from "./interfaces/transaction/CommitTransaction.interface.js";
import IRollbackTransaction from "./interfaces/transaction/RollbackTransaction.interface.js";
import IOptimize from "./interfaces/managing/Optimize.interface.js";

export default interface IDBManager
  extends IFileWithPath,
    IDBCloser,
    ISerialize,
    IParallelize,
    IBeginTransaction,
    ICommitTransaction,
    IRollbackTransaction,
    IOptimize {}
