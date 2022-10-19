const { response } = require("express");
const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

//ID validator
function validateID(req, res) {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid id.");
  }
}

//return all staffs
const staffsGet = async (req, res) => {
  const result = await mongodb.getDb().db().collection("staff").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-type", "application/json");
    res.status(200).json(lists);
  });
};

//return one staff
const staffGet = async (req, res) => {
  validateID(req, res);
  const staffID = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection("staff")
    .find({ _id: staffID });
  result.toArray().then((lists) => {
    res.setHeader("Content-type", "application/json");
    res.status(200).json(lists);
  });
  // res.setHeader('Content-type', 'application/json');
  // res.status(200).send(result);
};

//create one staff
const staffPost = async (req, res) => {
  // console.log( req.body);
  // const uriBody = JSON.parse(req.body);
  const staff = {
    locationId: req.body.locationId,
    staffType: req.body.staffType,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone
  };
  const result = await mongodb.getDb().db().collection("staff").insertOne(staff);
  if (result.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(response.error || "some error occurred while creating the staff.");
  }
};

//delete one staff
const staffDelete = async (req, res) => {
  validateID(req, res);
  const staffID = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection("staff")
    .deleteOne({ _id: staffID });
  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "somthing went wrong while deleting the staff.");
  }
  // res.setHeader('Content-type', 'application/json');
  // res.status(200).send(result);
};

//create one staff
const staffPut = async (req, res) => {
  validateID(req, res);
  // console.log( req.body);
  // const uriBody = JSON.parse(req.body);
  const staffID = new ObjectId(req.params.id);
  const staff = {
    locationId: req.body.locationId,
    staffType: req.body.staffType,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone
  };
  const result = await mongodb
    .getDb()
    .db()
    .collection("staff")
    .updateOne({ _id: staffID }, { $set: staff });
  if (result.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(response.error || "some error occurred while creating the staff.");
  }
};

module.exports = {
  staffGet,
  staffsGet,
  staffPost,
  staffDelete,
  staffPut,
};
