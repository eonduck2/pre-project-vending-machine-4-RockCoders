class DatabaseManager {
  #db;

  constructor(dbFilePath) {
    this.#db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {
        console.error("Could not connect to database", err);
      } else {
        console.log("Connected to database");
      }
    });
  }

  static createTable(dbFilePath, tableName, columns) {
    const db = new sqlite3.Database(dbFilePath);
    const columnsDefinition = columns
      .map((column) => `${column.name} ${column.type}`)
      .join(", ");
    const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnsDefinition})`;

    return new Promise((resolve, reject) => {
      db.run(sql, (err) => {
        db.close();
        if (err) {
          console.error(`Error creating table ${tableName}`, err);
          reject(err);
        } else {
          console.log(`Table ${tableName} created successfully`);
          resolve();
        }
      });
    });
  }

  createRecord(tableName, record) {
    const columns = Object.keys(record).join(", ");
    const placeholders = Object.keys(record)
      .map(() => "?")
      .join(", ");
    const values = Object.values(record);
    const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;

    return new Promise((resolve, reject) => {
      this.#db.run(sql, values, function (err) {
        if (err) {
          console.error(`Error creating record in table ${tableName}`, err);
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  }

  readRecord(tableName, id) {
    const sql = `SELECT * FROM ${tableName} WHERE id = ?`;

    return new Promise((resolve, reject) => {
      this.#db.get(sql, [id], (err, row) => {
        if (err) {
          console.error(`Error reading record from table ${tableName}`, err);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  updateRecord(tableName, id, updates) {
    const setClause = Object.keys(updates)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = [...Object.values(updates), id];
    const sql = `UPDATE ${tableName} SET ${setClause} WHERE id = ?`;

    return new Promise((resolve, reject) => {
      this.#db.run(sql, values, function (err) {
        if (err) {
          console.error(`Error updating record in table ${tableName}`, err);
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  }

  deleteRecord(tableName, id) {
    const sql = `DELETE FROM ${tableName} WHERE id = ?`;

    return new Promise((resolve, reject) => {
      this.#db.run(sql, [id], function (err) {
        if (err) {
          console.error(`Error deleting record from table ${tableName}`, err);
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  }

  close() {
    this.#db.close((err) => {
      if (err) {
        console.error("Error closing the database connection", err);
      } else {
        console.log("Database connection closed");
      }
    });
  }
}
