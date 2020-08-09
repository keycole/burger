const orm = require('../config/orm.js');

const burger = {
    selectAll: (cb) => {
        orm.selectAll(`burgers`, (res) => {
            console.log(`The res inside burger model selectAll = ${JSON.stringify(res)}`);
            cb(res);
        });
    },

    //The cols and vals parameters are arrays
    insertOne: (cols, vals, cb) => {
        orm.insertOne(`burgers`, cols, vals, (res) => {
            console.log(`The res inside burger model insertOne = ${JSON.stringify(res)}`);
            cb(res);
        });
    },

    updateOne: (objColVals, condition, cb) => {
        console.log(`The objColVals inside model burger.js = ${JSON.stringify(objColVals)}`);
        orm.updateOne(`burgers`, objColVals, condition, (res) => {
            console.log(`The res inside burger model updateOne = ${JSON.stringify(res)}`);
            cb(res);
        });
    },

    deleteOne: (condition, cb) => {
        orm.deleteOne(`burgers`, condition, (res) => {
            console.log(`The res inside burger model updateOne = ${JSON.stringify(res)}`);
            cb(res);
        });
    }
};

//Export the database functions for use in the controller (burgers_controller.js)
module.exports = burger;