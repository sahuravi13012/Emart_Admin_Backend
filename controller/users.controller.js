const databaseConnection = require("../model/config");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const getUsers = async (req, res) => {
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

const countTotalUser = async (req, res) => {
  try {
    const sqlQuery = "SELECT count(*) as TotalUser FROM users";
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

const addUsers = async (req, res) => {
  try {
    const min = 1000000; // Minimum 7-digit value
    const max = 9999999; // Maximum 7-digit value
    const randomId = Math.floor(Math.random() * (max - min + 1) + min);
    const userId = randomId.toString();
    let genSalt = await bcrypt.genSalt(10);
    let encryptPassword = await bcrypt.hash(req.body.password, genSalt);

    console.log("encryptPassword", encryptPassword);

    const data = {
      id: userId,
      name: req.body.name,
      password: encryptPassword,
      createdon: new Date(),
    };

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

const UserLogin = async (req, res) => {
  try {
    const { id, password } = req.body;
    console.log("id", id);
    console.log("passsword", password);
    const sqlQuery =
      "SELECT users.id as id,users.password as password, role.rolename FROM users JOIN role_assign ON users.id = role_assign.id JOIN role ON role_assign.roleid = role.roleid WHERE users.id =? GROUP BY role_assign.roleid, role.rolename";
    await databaseConnection.query(sqlQuery, id, async (err, result) => {
      console.log("result", result);
      if (!result.length) {
        res.send({ status: 405, Error: "Id is Not Found" });
      } else {
        let passwordMatch = await bcrypt.compare(password, result[0].password);
        if (!passwordMatch) {
          return res.send({ status: 403, Error: "Password Doen't Match" });
        } else {
          // if()
          let token = await jwt.sign({ id: result[0].id }, "sdhhjsh");
          // console.log("token", token);
          const roles = result.map((row) => row.rolename);
          // res.send({
          //   id,
          //   token,
          //   roles,
          // });
          // re.c("roles", roles);
          // res.send(req.cookie);
          res.status(200).json({
            message: "succesfull login",
            token,
          });
        }
      }
    });
  } catch (err) {
    res.send(err.message);
  }
};

const adminRoleAssignUpdate = async (req, res) => {
  try {
    let data = req.body;
    let uid = req.params.id;
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

const adminRoleAssignDelete = async (req, res) => {
  try {
    let id = req.params.id;
    console.log("id", id);
    let sqlQuery = "DELETE FROM role_assign where id = ?";
    await databaseConnection.query(sqlQuery, id, (error, result) => {
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
let updateUsersStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    console.log("id", id);
    console.log("status", status);
    const query = "UPDATE users SET status = ? WHERE id = ?";
    await databaseConnection.query(query, [status, id]);
    res.send({ status: "success", message: "user status updated" });
  } catch (error) {
    res
      .status(500)
      .send({ status: "error", message: "Failed to update user status" });
  }
};
const userDelete = async (req, res) => {
  try {
    let id = req.params.id;
    console.log("req.params.id", req.params.id);
    let sqlQuery =
      "DELETE users, role_assign, user_profile FROM users LEFT JOIN role_assign ON users.id = role_assign.id LEFT JOIN user_profile ON users.id = user_profile.upid WHERE users.id = ?";
    await databaseConnection.query(sqlQuery, id, (error, result) => {
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
  countTotalUser,
  getUsers,
  addUsers,
  updateUsersStatus,
  adminRoleAssignUpdate,
  adminRoleAssignDelete,
  UserLogin,
  userDelete,
};
