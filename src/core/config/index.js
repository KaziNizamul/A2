const mysql = require('mysql');

const config = () => {
  let connection = mysql.createConnection({
    host: 'db-instance-id.cz06a2yugzdx.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'password',
    database: 'init_db',
    port: 3306,
    timeout: 600000
  });

  connection.connect(err => {
    if (err) {
      console.log(`error occured. ${err.stack}`);
      return;
    }
    console.log(`✅ connected @${connection.threadId}`)
  });

  return connection;
}

exports.config = config;