const databaseConnection = require("../model/config");
const uuid = require("uuid").v4;
//============================Admin profile View ============================

const adminLoginGet = async (req, res) => {
  try {
    const sqlQuery = "SELECT * FROM users";

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
//============================Admin profile Add ============================

const adminLoginPost = async (req, res) => {
  try {
    const { name, password } = req.body;
    const data = {
      id: uuid(),
      name,
      password,
    };
    console.log("data",data)
    const sqlQuery = "INSERT INTO users SET ?";
    await databaseConnection.query(sqlQuery, data, (error, result) => {
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
//============================Admin Login profile Complite update  ============================

const adminLoginUpdate = async (req, res) => {
  try {
    let data = req.body;
    let uid = req.params.uid;
    let sqlQuery = "UPDATE users SET ? where id = ?";
    await databaseConnection.query(sqlQuery, [data, uid], (error, result) => {
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
//============================Admin Login profile status update  ============================

const adminLoginStatusUpdate = async (req, res) => {
  try {
    let data = req.body.status;
    let uid = req.params.uid;
    let sqlQuery = "UPDATE users SET status=? where id = ?";
    await databaseConnection.query(sqlQuery, [data, uid], (error, result) => {
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

//============================Admin Login profile Password update  ============================

const adminLoginPasswordUpdate = async (req, res) => {
  try {
    let data = req.body.password;
    let uid = req.params.id;
    let sqlQuery = "UPDATE users SET password=? where id = ?";
    await databaseConnection.query(sqlQuery, [data, uid], (error, result) => {
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

//============================Admin profile Delete ============================

const adminLoginDelete = async (req, res) => {
  try {
    let uid = req.params.id;
    let sqlQuery = "DELETE FROM users where id = ?";
    await databaseConnection.query(sqlQuery, uid, (error, result) => {
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
  adminLoginGet,
  adminLoginPost,
  adminLoginUpdate,
  adminLoginDelete,
  adminLoginStatusUpdate,
  adminLoginPasswordUpdate,
};
