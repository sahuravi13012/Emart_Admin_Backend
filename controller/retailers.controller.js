const databaseConnection = require("../model/config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// -------------------------------------------------- retailer Signup ---------------------------------------------------

const postRetailer = async (req, res) => {
  try {
    const min = 1000000;
    const max = 9999999;

    const randomId = Math.floor(Math.random() * (max - min + 1) + min);
    const retailer_id = randomId.toString();
    console.log("first", req.body);
    console.log("filesss", req.files.profile_photo[0].location);
    console.log("second");

    const genSalt = await bcrypt.genSalt(10);
    console.log("genSalt", genSalt);
    const encryptPassword = await bcrypt.hash(req.body.password, genSalt);
    console.log("encryptPassword", encryptPassword);
    const data = {
      retailer_id: retailer_id,
      shop_name: req.body.shop_name,
      password: encryptPassword,
      owner_name: req.body.owner_name,
      registration_no: req.body.registration_no,
      registration_doc: req.files.registration_doc[0].location,
      profile_photo: req.files.profile_photo[0].location,
      gst_no: req.body.gst_no,
      pan_no: req.body.pan_no,
      address: req.body.address,
      state: req.body.state,
      city: req.body.city,
      pincode: req.body.pincode,
      contact_no: req.body.contact_no,
      email: req.body.email,
    };
    console.log("data", data);
    console.log("third");

    const sqlquery = "INSERT INTO  retailer_registration SET ?";
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

// ---------------------------------------------- getAllData of Retailer ---------------------------------------------
let getRetailer = async (req, res) => {
  try {
    const sqlquery = "SELECT * FROM  retailer_registration ";
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

// -------------------------------------------------- Count Retailer -------------------------------------------------
const countTotalRetailers = async (req, res) => {
  try {
    const sqlQuery =
      "SELECT count(*) as 'TotalRetailer' FROM retailer_registration";

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

const loginRetailer = async (req, res) => {
  const { retailer_id, password } = req.body;
  console.log("reqbody", req.body);

  const query = "SELECT * FROM retailer_registration WHERE retailer_id = ?";

  databaseConnection.query(query, retailer_id, async (err, results) => {
    if (!results.length) {
      return res.send({
        status: 405,
        Error: "Id is Not Found,Please create account first",
      });
    } else {
      let passwordMatch = await bcrypt.compare(password, results[0].password);
      if (!passwordMatch) {
        return res.send({ status: 403, Error: "Password Doen't Match" });
      } else {
        const token = jwt.sign(
          {
            retailer_id: results[0].retailer_id,
            email: results[0].email,
            status: results[0].status,
          },
          "ravisahu",
          {
            expiresIn: "1day",
          }
        );
        return res.status(200).cookie("token", token).json({
          token: token,
          data: results,
          message: "Login Successfull",
          status: true,
        });
      }
    }
  });
};
const verifyRetailer = async (req, res) => {
  try {
    const token = req.cookies.token;
    console.log("tokennnn", token);
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    jwt.verify(token, "ravisahu", (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      }

      res.status(200).json({ message: "Token is valid", token });
    });
  } catch (err) {
    res.send(err.message);
  }
};
let updateRetailer = async (req, res) => {
  try {
    const data = [req.body, req.params.retailer_id];
    const sqlquery = "UPDATE  retailer_registration SET ? WHERE retailer_id= ?";
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
let updateStatus = async (req, res) => {
  // Perform necessary input validation

  try {
    const { retailerid } = req.params;
    const { status } = req.body;
    console.log("retailerid", retailerid);
    console.log("status", status);
    const query =
      "UPDATE retailer_registration SET status = ? WHERE retailer_id = ?";
    await databaseConnection.query(query, [status, retailerid]);
    res.send({ status: "success", message: "Product status updated" });
  } catch (error) {
    res
      .status(500)
      .send({ status: "error", message: "Failed to update product status" });
  }
};

let deleteRetailer = async (req, res) => {
  try {
    const data = req.params.retailerid;
    const sqlquery = "DELETE FROM retailer_registration where retailer_id=? ";
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
// ===============================Shop Profile Picture update=====================
const ShopProfilePictureUpdate = async (req, res) => {
  try {
    const data = [req.file.location, req.params.retailer_id];
    console.log("req.body.status", req.body.status);
    const sqlQuery =
      "UPDATE retailer_registration SET profile_photo= ? where retailer_id= ? ";
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
//===============================Shop Password update=====================
const shopPasswordUpdate = async (req, res) => {
  try {
    const data = [req.body.password, req.params.retailer_id];
    const sqlQuery =
      "UPDATE retailer_registration SET password= ? where retailer_id= ? ";
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

//===================================Shop Remove =========================
const retailersDelete = async (req, res) => {
  try {
    let productId = req.params.retailer_id;
    let sqlQuery = "DELETE FROM retailer_registration where retailer_id=?";
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
  countTotalRetailers,
  updateStatus,
  getRetailer,
  postRetailer,
  updateRetailer,
  deleteRetailer,
  loginRetailer,
  verifyRetailer,
};
