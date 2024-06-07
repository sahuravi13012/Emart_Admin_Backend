const databaseConnection = require("../model/config");
const uuid = require("uuid").v4;

const adminRoleGet = async (req, res) => {
  try {
    const sqlQuery = "SELECT * FROM role";

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
const adminRoleGetById = async (req, res) => {
  try {
    const roleid = req.params;
 
    const sqlQuery = `SELECT rolename FROM role where roleid =${roleid}`;
 
    await databaseConnection.query(sqlQuery, roleid, (error, result) => {
      
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

const adminRolePost = async (req, res) => {
  try {
    let { rolename } = req.body;
    const data = {
      roleid: uuid(),
      rolename,
    };
    const sqlQuery = "INSERT INTO role SET?";
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

const adminRoleUpdate = async (req, res) => {
  try {
    let data = req.body;
    let uid = req.params.roleid;
    let sqlQuery = "UPDATE role SET ? where roleid = ?";
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

const adminRoleDelete = async (req, res) => {
  try {
    let uid = req.params.roleid;
    let sqlQuery = "DELETE FROM role where roleid = ?";
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
  adminRoleGet,
  adminRolePost,
  adminRoleUpdate,
  adminRoleDelete,
  adminRoleGetById,
};
