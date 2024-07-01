const sqlite3VM = require(`sqlite3`).verbose();
const database = sqlite3VM.Database;

export default interface IDB {
  db: typeof database;
}
