const validator = require("../helpers/validate");

const saveUser = (req, res, next) => {
  const validationRule = {
    firstName: "required|string",
    lastName: "required|string",
    email: "required|email",
    phone: "required|int"
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const saveLocation = (req, res, next) => {
  const validationRule = {
    locationType: "required|string",
    locationType: "required|string"
  };



  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};


const saveStaff = (req, res, next) => {
    const validationRule = {
        locationId: "required|string",
        staffType: "required|string",
        firstName: "required|string",
        lastName: "required|string",
        email: "required|string",
        phone: "required|int"
    };
  
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: "Validation failed",
          data: err,
        });
      } else {
        next();
      }
    });
  };

  const saveReservation = (req, res, next) => {
    const validationRule = {
        locationId: "required|string",
        roomId: "required|string",
        userId: "required|string",
        checkInDate: "required|string",
        checkOutDate: "required|string",
        price: "required|int"
    };
  
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: "Validation failed",
          data: err,
        });
      } else {
        next();
      }
    });
  };

module.exports = {
  saveUser,
  saveLocation,
  saveReservation,
  saveStaff

};
