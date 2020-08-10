//Set up the MYSQL connection
const mysql = require("mysql");

let connection;

if(process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: process.env.PASSWORD,
        database: "burgers_db"
      });
};

//Make the connection
connection.connect( (err) => {
    console.log(`Entering the connect function in connection.js`);
    if(err){
        console.error(`There was an error connecting: ${err.stack}`);
        return;
    }
    console.log(`Connected as id: ${connection.threadId}`);
});

//Export connection to the orm file
module.exports = connection;