import IBeginTransaction from "../../interfaces/transaction/BeginTransaction.interface";
import ICommitTransaction from "../../interfaces/transaction/CommitTransaction.interface";
import IRollbackTransaction from "../../interfaces/transaction/RollbackTransaction.interface";

export default interface TransactionController
  extends IBeginTransaction,
    ICommitTransaction,
    IRollbackTransaction {}
