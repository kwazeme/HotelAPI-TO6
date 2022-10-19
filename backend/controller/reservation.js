const { response } = require("express");
const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

//ID validator
function validateID(req, res) {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid id.");
  }
}

//return all reservations
const reservationsGet = async (req, res) => {
  const result = await mongodb.getDb().db().collection("reservation").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-type", "application/json");
    res.status(200).json(lists);
  });
};

//return one reservation
const reservationGet = async (req, res) => {
  validateID(req, res);
  const reservationID = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection("reservation")
    .find({ _id: reservationID });
  result.toArray().then((lists) => {
    res.setHeader("Content-type", "application/json");
    res.status(200).json(lists);
  });
  // res.setHeader('Content-type', 'application/json');
  // res.status(200).send(result);
};

//create one reservation
const reservationPost = async (req, res) => {
  // console.log( req.body);
  // const uriBody = JSON.parse(req.body);
  const reservation = {
    locationId: req.body.locationId,
    roomId: req.body.roomId,
    userId: req.body.userId,
    checkInDate: req.body.checkInDate,
    checkOutDate: req.body.checkOutDate,
    price: req.body.price,
  };
  const result = await mongodb.getDb().db().collection("reservation").insertOne(reservation);
  if (result.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(response.error || "some error occurred while creating the reservation.");
  }
};

//delete one reservation
const reservationDelete = async (req, res) => {
  validateID(req, res);
  const reservationID = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection("reservation")
    .deleteOne({ _id: reservationID });
  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "somthing went wrong while deleting the reservation.");
  }
  // res.setHeader('Content-type', 'application/json');
  // res.status(200).send(result);
};

//create one reservation
const reservationPut = async (req, res) => {
  validateID(req, res);
  // console.log( req.body);
  // const uriBody = JSON.parse(req.body);
  const reservationID = new ObjectId(req.params.id);
  const reservation = {
    locationId: req.body.locationId,
    roomId: req.body.roomId,
    userId: req.body.userId,
    checkInDate: req.body.checkInDate,
    checkOutDate: req.body.checkOutDate,
    price: req.body.price,
  };
  const result = await mongodb
    .getDb()
    .db()
    .collection("reservation")
    .updateOne({ _id: reservationID }, { $set: reservation });
  if (result.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(response.error || "some error occurred while creating the reservation.");
  }
};

module.exports = {
  reservationGet,
  reservationsGet,
  reservationPost,
  reservationDelete,
  reservationPut,
};
