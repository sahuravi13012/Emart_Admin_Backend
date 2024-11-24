const databaseConnection  = require("../model/config");

const OfferGet = async (req, res) => {
  try {
    const sqlQuery = "SELECT * FROM offers";

    await databaseConnection.query(sqlQuery, (error, result) => {
      if (error) {
        res.send({ status: 400, Error: error.sqlMessage });
      } else {
        res.send({ status: 200, response: result });
      }
    });
  } catch (err) {
    res.send({ Error: err.sqlMessage });
  }
};

const OfferPost = async (req, res) => {
  try {
    const apiData = req.body;
    const sqlQuery = "INSERT INTO offers SET?";
    await databaseConnection.query(sqlQuery, apiData, (error, result) => {
      if (error) {
        res.send({ status: 400, Error: error.sqlMessage });
      } else {
        res.send({ status: 200, response: result });
      }
    });
  } catch (err) {
    res.send({ Message: err.sqlMessage });
  }
};

const offerUpdate = async (req, res) => {
  try {
    let data = req.body;
    let offerId = req.params.offercode;
    let sqlQuery = "UPDATE offers SET ? where offercode = ?";
    await databaseConnection.query(sqlQuery, [data, offerId], (error, result) => {
      if (error) {
        res.send({ status: 400, Error: error.sqlMessage });
      } else {
        res.send({ status: 200, response: result });
      }
    });
  } catch (err) {
    res.send({ Error: err.sqlMessage });
  }
};

const offerDelete = async (req, res) => {
  try {
    let offerId = req.params.offercode;
    let sqlQuery = "DELETE FROM offers WHERE offercode = ?";
    await databaseConnection.query(sqlQuery, offerId, (error, result) => {
      if (error) {
        res.send({ status: 400, Error: error.sqlMessage });
      } else {
        res.send({ status: 200, response: result });
      }
    });
  } catch (err) {
    res.send({ Error: err.sqlMessage });
  }
};

module.exports = {
  OfferGet,
  OfferPost,
  offerUpdate,
  offerDelete,
};