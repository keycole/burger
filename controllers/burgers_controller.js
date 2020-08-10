const express = require("express");
const router = express.Router();
const burger = require("../models/burger.js");

router.get("/", (req, res) => {
    console.log(`The req inside burgers controller get = ${req}`);

    burger.selectAll( data => {
        let hbsObject = {
            burgers: data
        };
        console.log(`The hbsObject inside burgers_controller selectAll = ${JSON.stringify(hbsObject)}`);
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", (req, res) => {
    console.log(`The res inside burgers_controller.js = ${res}`);
    console.log(`The req.body inside POST = ${req.body}`);
    burger.insertOne([
        "burger_name"
    ], [
        req.body.burger_name
    ], result => {
        //Send back the id of the new burger
        res.json({ id: result.insertId });
    });
});

router.put("/api/burgers/:id", (req, res) => {
    console.log(`The req.params = ${req.params}`);
    console.log(`The req.params.id inside burgers controller = ${req.params.id}`);
    let condition = "id = " + req.params.id;

    console.log(`The condition inside burgers_controller updateOne = ${condition}`);

    burger.updateOne({
        devoured: "true"
    }, condition, result => {
        if(result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete("/api/burgers/:id", (req, res) => {
    let condition = "id = " + req.params.id;

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