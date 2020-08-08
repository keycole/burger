const express = require('express');
const router = express.Router();
const burger = require('../models/burger.js');

router.get('/', (req, res) => {
    burger.selectAll( data => {
        let hbsObject = {
            burgers: data
        };
        console.log(`The hbsObject inside burgers_controller selectAll = ${hbsObject}`);
        res.render('index', hbsObject);
    });
});

router.post('api/burgers', (res, req) => {
    burger.insertOne([
        'burger_name'
    ], [
        req.body.name
    ], result => {
        //Send back the id of the new burger
        res.json({ id: result.insertId });
    });
});

router.put('api/burgers/:id', (req, res) => {
    let condition = 'id = ' + req.params.id;

    console.log(`The condition inside burgers_controller updateOne = ${condition}`);

    burger.updateOne({
        devoured: req.body.devoured
    }, condition, result => {
        if(result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete('/api/burgers/:id', (req, res) => {
    let condition = 'id = ' + req.params.id;

    burger.deleteOne(condition, result => {
        if(result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

//Export routes for server.js to use
module.exports = router;