const databaseConnection = require("../model/config");

let getCustomer = async (req, res) => {
  try {
    const sqlquery = "SELECT * FROM  customer ";
    await databaseConnection.query(sqlquery, (err, result) => {
      if (err) {
        res.send({ Error: err.sqlMessage });
      }
      res.send({ Status: 200, Response: result });
    });
  } catch (err) {
    res.send(err.sqlMessage);
  }
};
const countTotalCustomers = async (req, res) => {
  try {
    const sqlQuery = "SELECT count(*) as 'TotalCustomer' FROM  customer ";

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
const postCustomer = async (req, res) => {
  try {
    const data = req.body;
    const sqlquery = "INSERT INTO  customer SET ?";
    await databaseConnection.query(sqlquery, data, (err, result) => {
      if (err) {
        res.send({ Error: err.sqlMessage });
      }
      res.send({ Status: 200, Response: result });
    });
  } catch (err) {
    res.send(err.sqlMessage);
  }
};
let updateCustomer = async (req, res) => {
  try {
    const data = [req.body, req.params.Customer_id];
    const sqlquery = "UPDATE  customer SET ? WHERE email= ?";
    await databaseConnection.query(sqlquery, data, (err, result) => {
      if (err) {
        return res.send({ Error: err.sqlMessage });
      }
      res.send({ status: 200, response: result });
    });
  } catch (err) {
    res.send(err.sqlmessage);
  }
};

let deleteCustomer = async (req, res) => {
  try {
    const data = req.params.Customer_id;
    const sqlquery = "DELETE FROM customer where email=? ";
    databaseConnection.query(sqlquery, data, (err, result) => {
      if (err) {
        return res.send({ Error: err.sqlMessage });
      }
      res.send({ status: 200, response: result });
    });
  } catch (err) {
    res.send(err.sqlmessage);
  }
};
module.exports = {
  countTotalCustomers,
  getCustomer,
  postCustomer,
  updateCustomer,
  deleteCustomer,
};
