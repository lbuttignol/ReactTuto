import sqlite3 from 'sqlite3';
import Promise from 'bluebird';

class Database{  
  constructor() {
    this.db = new sqlite3.Database('./mydb.sqlite', (err) => {
      if (err) {
        console.log('Could not connect to database', err)
      } else {
        console.log('Connected to database')
      }
    })
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          console.log('Error running sql ', sql, err)
          reject(err)
        } else {
          resolve({ id: this.lastID })
        }
      })
    })
  }

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, function(err, rows) {
        if (err) {
          console.log('Error running sql ', sql, err)
          reject(err)
        } else {
          console.log("rows",rows)
          resolve(rows)
        }
      })
    })
  }

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, function(err, row) {
        if (err) {
          console.log('Error running sql ', sql, err)
          reject(err)
        } else {
          resolve(row)
        }
      })
    })
  }

  close() {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err){
          console.log("Error closing Database")
          reject(err);
        }else{
          console.log('Database Disconnectd')
          resolve();
        }
      })
    })
  }
}

module.exports = Database;