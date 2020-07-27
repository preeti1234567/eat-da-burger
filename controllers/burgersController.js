var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");

class Model {
  constructor(name, devoured) {
    this.name = name;
    this.devoured = devoured;
  }
}

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
  burger.selectAll(function (data) {
    var hbsObject = {
      burgers: data,
    };
    res.render("index", hbsObject);
  });
});

router.get("/api/burgers", function (req, res) {
  burger.selectAll(function (result) {
    // Send back the ID of the new quote
    res.json(result);
  });
});

router.get("/api/burgers/:id", function (req, res) {
  burger.select(req.params.id, function (result) {
    console.log(result);
    if (result) {
      res.json(result);      
    } else {
     // If no rows were changed, then the ID must not exist, so 404
     return res.status(404).send("Id doesnot exists").end();
    }
  });
});

router.post("/api/burgers", function (req, res) {
  const model = new Model(req.body.name, req.body.devoured);
  console.log(model);
  burger.insertOne(model, function (result) {
    // Send back the ID of the new quote
    res.status(201).send("New Record created").end();
  });
});

router.put("/api/burgers/:id", function (req, res) {
  const model = new Model(req.body.name, req.body.devoured);

  burger.updateOne(model, req.params.id, function (result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).send("Id doesnot exists").end();
    } else {
      res.status(200).send("Record updated").end();
    }
  });
});

router.delete("/api/burgers/:id", function (req, res) {
  burger.delete(req.params.id, function (result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).send("Id doesnot exists").end();
    } else {
      res.status(200).send("Record deleted").end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
