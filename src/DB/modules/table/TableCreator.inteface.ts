import IDB from "../../interfaces/Db.interface";
import IDBCloser from "../../interfaces/Close.interface";
import IDBConnector from "../../DBConnector.interface";

export default interface ITableCreator {
  createTable(): void;
}
