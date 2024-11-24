const databaseConnection = require("../model/config");

const adminUserProfileGet = async (req, res) => {
  try {
    const sqlQuery = "SELECT * FROM user_profile";
    await databaseConnection.query(sqlQuery, (error, result) => {
      if (error) {
        res.send({ status: 400, Error: error.sqlMessage });
      } else {
        res.send({ status: 200, response: result });
      }
    });
  } catch (error) {
    res.send({ Error: error.sqlMessage });
  }
};
const adminUserProfilePost = async (req, res) => {
  try {
    const data = [
      req.body.id,
      req.body.mobile,
      req.body.email,
      req.body.aadhar,
      req.body.address,
      req.body.state,
      req.body.city,
      req.body.pincode,
      req.file.location,
    ];

    const sqlQuery = "INSERT INTO user_profile(upid,mobile_no,email,aadhar,address,state,city,pincode,profile)  values(?,?,?,?,?,?,?,?,?)";
  
    await databaseConnection.query(sqlQuery, data, (error, result) => {
      if (error) {
        res.send({ status: 400, Error: error.sqlMessage });
      } else {
        res.send({ status: 200, response: result });
      }
    });
  } catch (error) {
    res.send({ Error: error.sqlMessage });
  }
};
//============= update user==============//

const adminUserProfileUpdate = async (req, res) => {
  try {
    const data = {
      mobile: req.body.mobile,
      email: req.body.email,
      aadhar: req.body.aadhar,
      address: req.body.address,
      state: req.body.state,
      city: req.body.city,
      pincode: req.body.pincode,
      photo: req.file.location,
    };
    let uid = req.params.id;
    let sqlQuery = "UPDATE user_profile SET ? WHERE upid = ?";
    await databaseConnection.query(sqlQuery, [data, uid], (error, result) => {
      if (error) {
        res.send({ status: 400, Error: error.sqlMessage });
      } else {
        res.send({ status: 200, response: result });
      }
    });
  } catch (error) {
    res.send({ Error: error.sqlMessage });
  }
};

//============================AdminUserProfilePhotoUpdate==============
const adminUserProfilePhotoUpdate = async (req, res) => {
  try {
    const data = {
  
      photo:req.file.location,
    }
    let uid = req.params.id;
    let sqlQuery = "UPDATE user_profile SET profile=? where upid = ?";
    await databaseConnection.query(sqlQuery, [data, uid], (error, result) => {
      if (error) {
        res.send({ status: 400, Error: error.sqlMessage });
      } else {
        res.send({ status: 200, response: result });
      }
    });
  } catch (error) {
    res.send({ Error: error.sqlMessage });
  }
};

//==============user Delete =========================

const adminUserProfileDelete = async (req, res) => {
  try {
    let productId = req.params.id;
    let sqlQuery = "DELETE FROM user_profile where upid=?";
    await databaseConnection.query(sqlQuery, productId, (error, result) => {
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
  adminUserProfileGet,
  adminUserProfileUpdate,
  adminUserProfileDelete,
  adminUserProfilePost,
  adminUserProfilePhotoUpdate
};