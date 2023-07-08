const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This helps convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the records.
recordRoutes.route("/record").get(async function (req, res) {
  const db_connect = dbo.getDb("employees");
  try {
    var records = await db_connect.collection("records").find({}).toArray();
    res.json(records);
  } catch (e) {
    console.log("An error occurred pulling the records. " + e);
  }
});

// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(async function (req, res) {
  const db_connect = dbo.getDb();
  const myquery = { _id: new ObjectId(req.params.id) };
  const record = await db_connect.collection("records").findOne(myquery);
  res.json(record);
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(async function (req, response) {
  const db_connect = dbo.getDb();
  const myobj = {
    name: req.body.name,
    position: req.body.position,
    level: req.body.level,
  };
  const savedRecord = await db_connect.collection("records").insertOne(myobj);
  response.json(savedRecord);
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(async function (req, response) {
  const db_connect = dbo.getDb();
  const myquery = { _id: new ObjectId(req.params.id) };
  const newvalues = {
    $set: {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    },
  };
  const updatedRecord = await db_connect
    .collection("records")
    .updateOne(myquery, newvalues);
  response.json(updatedRecord);
});

// This section will help you delete a record
recordRoutes.route("/:id").delete(async (req, response) => {
  const db_connect = dbo.getDb();
  const myquery = { _id: new ObjectId(req.params.id) };
  const deletedRecord = await db_connect
    .collection("records")
    .deleteOne(myquery);
  response.json(deletedRecord);
});

module.exports = recordRoutes;
