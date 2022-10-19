const { response } = require("express");
const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

//ID validator
function validateID(req, res) {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid id.");
  }
}

//return all locations
const locationsGet = async (req, res) => {
  const result = await mongodb.getDb().db().collection("location").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-type", "application/json");
    res.status(200).json(lists);
  });
};

//return one location
const locationGet = async (req, res) => {
  validateID(req, res);
  const locationID = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection("location")
    .find({ _id: locationID });
  result.toArray().then((lists) => {
    res.setHeader("Content-type", "application/json");
    res.status(200).json(lists);
  });
  // res.setHeader('Content-type', 'application/json');
  // res.status(200).send(result);
};

//create one location
const locationPost = async (req, res) => {
  // console.log( req.body);
  // const uriBody = JSON.parse(req.body);
  const location = {
    locationType: req.body.locationType,
    locationName: req.body.locationName,
  };
  const result = await mongodb.getDb().db().collection("location").insertOne(location);
  if (result.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(response.error || "some error occurred while creating the location.");
  }
};

//delete one location
const locationDelete = async (req, res) => {
  validateID(req, res);
  const locationID = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection("location")
    .deleteOne({ _id: locationID });
  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "somthing went wrong while deleting the location.");
  }
  // res.setHeader('Content-type', 'application/json');
  // res.status(200).send(result);
};

//create one location
const locationPut = async (req, res) => {
  validateID(req, res);
  // console.log( req.body);
  // const uriBody = JSON.parse(req.body);
  const locationID = new ObjectId(req.params.id);
  const location = {
    locationType: req.body.locationType,
    locationName: req.body.locationName,
  };
  const result = await mongodb
    .getDb()
    .db()
    .collection("location")
    .updateOne({ _id: locationID }, { $set: location });
  if (result.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(response.error || "some error occurred while creating the location.");
  }
};

module.exports = {
  locationGet,
  locationsGet,
  locationPost,
  locationDelete,
  locationPut,
};
