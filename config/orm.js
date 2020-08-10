//Import the MYSQL connection from connection.js
const connection = require("../config/connection.js");

//Set up the helper functions for MYSQL syntax
const printQuestionMarks = (num) => {
    let arr = [];

    for(let i = 0; i < num; i ++) {
        arr.push("?");
    }
    console.log(`The printQuestionMarks arr inside the orm file = ${arr}`);
    return arr.toString();
};

const objToSql = (ob) => {
    console.log(`The ob inside objToSequel = ${JSON.stringify(ob)}`);
    let arr = [];
    
    for(let key in ob) {
        let value = ob[key];
        if(Object.hasOwnProperty.call(ob, key)) {
            console.log(`The Objec propertu = ${Object.hasOwnProperty(key)}`);
            if(typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
                console.log(`The value inside if = ${value}`);
                console.log(`The key = ${key} & the ob = ${ob}`);
            }
            console.log(`The key =  = ${key}`);
            console.log(` The value = ${value}`);

            arr.push(key + " = " + value);
            
        }
    }
    console.log(`The objToSql arr in the orm file = ${arr}`);
    return arr.toString();
};

const orm = {
    selectAll: (tableInput, cb) => {
        let queryString = "SELECT * FROM " + tableInput + ";";
        console.log(`The queryString inside orm seletAll = ${queryString}`);

        connection.query(queryString, (err,result) => {
            if(err){
                throw err;
            }
            cb(result);
        });
    },

    insertOne: (table, cols, vals, cb) => {
        let queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(`The queryString inside orm create = ${queryString}`);

        connection.query(queryString, vals, (err, result) => {
            if(err){
                throw err;
            }
            cb (result);
        });
    },

    updateOne: (table, objColVals, condition, cb) => {
        let queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
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
        let queryString = "DELETE FROM " + table;

        queryString += " WHERE ";
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