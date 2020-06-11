const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();

const schema = fs.readFileSync(process.env.DB_SCHEMA).toString();

async function setup() {
  
  const db = new sqlite3.Database(process.env.DB_NAME, (err) => {
    if (err) {
      console.log('Could not connect to database', err);
    }
  })
  
  // Convert the SQL string to array so that you can run them one at a time.
  const dataArr = schema.toString().split(';');

  dataArr.forEach(query => {
    if (query) {
      // Add the delimiter back to each query before you run them
      query += ';';
      db.run(query, err => {
        if (err) throw err;
      });
    }
  });

  // Close the DB connection
  db.close(err => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Closed the database connection.');
  });
}

setup();