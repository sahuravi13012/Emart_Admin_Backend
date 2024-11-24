const databaseConnection = require("../model/config");

const adminRoleAssignGet = async (req, res) => {
  try {
    const sqlQuery = "SELECT * FROM role_assign ";

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

const adminRoleAssignPost = async (req, res) => {
  try {
    const apiData = req.body;
    let data = {
      roleid: req.body.roleid,
      id: req.body.id,
      assignon: new Date(),
    };
    console.log("data", data);
    const sqlQuery = "INSERT INTO role_assign SET?";
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

const adminRoleAssignUpdate = async (req, res) => {
  try {
    let data = req.body;
    let uid = req.params.id;
    let sqlQuery = "UPDATE role_assign SET ? where id = ?";
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

const adminRoleAssignDelete = async (req, res) => {
  try {
    console.log("jghgfhfhf");
    let id = req.params.id;
    let roleid = req.params.roleid;
    console.log("id", id);
    console.log("roleid", roleid);
    let sqlQuery = "DELETE FROM role_assign where id = ? and roleid=?";
    await databaseConnection.query(sqlQuery, [id, roleid], (error, result) => {
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

let userRoleAssign = async (req, res) => {
  try {
    const { id } = req.params;
    const sqlQuery =
      "SELECT COUNT(role_assign.roleid) AS role_count, role_assign.roleid ,role.rolename FROM users JOIN role_assign ON users.id = role_assign.id JOIN role ON role_assign.roleid = role.roleid WHERE users.id = ? GROUP BY role_assign.roleid, role.rolename";

    await databaseConnection.query(sqlQuery, [id], (error, result) => {
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
  adminRoleAssignGet,
  adminRoleAssignPost,
  adminRoleAssignUpdate,
  adminRoleAssignDelete,
  userRoleAssign,
};
