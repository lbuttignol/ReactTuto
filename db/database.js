import sqlite3 from 'sqlite3';
import Promise from 'bluebird';

class Database{  
  constructor() {
    this.db = new sqlite3.Database(process.env.DB_NAME, (err) => {
      if (err) {
        console.log('Could not connect to database', err);
      }
    });
  };

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, (err) => {
        if (err) {
          console.log('Error running sql ', sql, err);
          reject(err);
        } else {
          resolve({ id: this.lastID })
        }
      });
    });
  }

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.log('Error running sql ', sql, err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) {
          console.log('Error running sql ', sql, err);
          reject(err);
        } else {
          resolve(row);
        }
      })
    })
  }

  close() {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err){
          console.log("Error closing Database");
          reject(err);
        }else{
          resolve();
        }
      })
    })
  }
}

export default Database;