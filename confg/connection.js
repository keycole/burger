//Set up the MYSQL connection
const mysql = require('mysql');
require('dotenv').config();

let connection;

if(process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection(process.env.PRODUCTION);
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

module.exports = connection;