//Import the MYSQL connection from connection.js
const connection = require('./connection.js');

//Set up the helper functions for MYSQL syntax
const printQuestionMarks = (num) => {
    let arr = [];

    for(let i = 0; i < num; i ++) {
        arr.push('?');
    }

    return arr.toString();
};

const objToSql = (ob) => {
    let arr = [];

    for(let key in ob) {
        if(Object.hasOwnProperty.call(ob, key)) {
            if(typeof value === 'string' && value.indexOf(' ') >= 0) {
                value = '"' + value + '"';
            }
            arr.push(key + '=' + value);
        }
    }
    return arr.toString();
};

const orm = {
    selectAll: (tableInput, cb) => {
        let queryString = 'SELECT * FROM ' + tableInput + ';';
        connection.query(queryString, (err,result) => {
            if(err){
                throw err;
            }
            cb(result);
        });
    },

    insertOne: (table, cols, vals, cb) => {
        let queryString = 'INSERT INTO ' + table;

        queryString += ' (';
        queryString += cols.toString();
        queryString += ') ';
        queryString += 'VALUES (';
        queryString += printQuestionMarks(vals.length);
        queryString += ') ';

        console.log(`The queryString inside orm create = ${queryString}`);

        connection.query(queryString, vals, (err, result) => {
            if(err){
                throw err;
            }
            cb (result);
        });
    },

    updateOne: (table, objColVals, condition, cb) => {
        let queryString = 'UPDATE ' + table;

        queryString += 'SET ';
        queryString += objToSql(objColVals);
        queryString += ' WHERE ';
        queryString += condition;

        console.log(`The queryString inside orm update = ${queryString}`);

        connection.query(queryString, (err, result) => {
            if(err){
                throw err;
            }

            cb(result);
        });
    },

    deleteOne: (table, condition, cb) => {
        let queryString = 'DELETE FROM ' + table;

        queryString += ' WHERE ';
        queryString += condition;

        connection.query(queryString, (err, result) => {
            if(err){
                throw err;
            }

            cb(result);
        });
    }
};

//Export the orm object for use in the model (burgers.js)
module.exports = orm;