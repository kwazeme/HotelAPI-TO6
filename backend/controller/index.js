const { response } = require("express");
const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

//ID validator
function validateID(req, res) {
  if (!ObjectId.isValid(req.params.ID)) {
    res.status(400).json("Must use a valid id.");
  }
}

//return all users
const usersGet = async (req, res) => {
  const result = await mongodb
    .getDb()
    .db()
    .collection("user")
    .find();
  result.toArray().then((lists) => {
    res.setHeader("Content-type", "application/json");
    res.status(200).json(lists);
  });
};

//return one user
const userGet = async (req, res) => {
  validateID(req, res);
  const userID = new ObjectId(req.params.ID);
  const result = await mongodb
    .getDb()
    .db()
    .collection("user")
    .find({ _id: userID });
  result.toArray().then((lists) => {
    res.setHeader("Content-type", "application/json");
    res.status(200).json(lists);
  });
  // res.setHeader('Content-type', 'application/json');
  // res.status(200).send(result);
};

//create one user
const userPost = async (req, res) => {
  // console.log( req.body);
  // const uriBody = JSON.parse(req.body);
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
  };
  const result = await mongodb
    .getDb()
    .db()
    .collection("user")
    .insertOne(user);
  if (result.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(response.error || "some error occurred while creating the user.");
  }
};

//delete one user
const userDelete = async (req, res) => {
  validateID(req, res);
  const userID = new ObjectId(req.params.ID);
  const result = await mongodb
    .getDb()
    .db()
    .collection("user")
    .deleteOne({ _id: userID });
  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "somthing went wrong while deleting the user.");
  }
  // res.setHeader('Content-type', 'application/json');
  // res.status(200).send(result);
};

//create one user
const userPut = async (req, res) => {
  validateID(req, res);
  // console.log( req.body);
  // const uriBody = JSON.parse(req.body);
  const userID = new ObjectId(req.params.ID);
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userLevel: req.body.userLevel,
    role: req.body.role,
    department: req.body.department,
    transactionCount: req.body.transactionCount,
    email: req.body.email,
  };
  const result = await mongodb
    .getDb()
    .db()
    .collection("user")
    .updateOne({ _id: userID }, { $set: user });
  if (result.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(response.error || "some error occurred while creating the user.");
  }
};

module.exports = {
  userGet,
  usersGet,
  userPost,
  userDelete,
  userPut
};
