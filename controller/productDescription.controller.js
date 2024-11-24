const databaseConnection = require("../model/config");

//==============================All Shop Registersion View=============

const productDescDatashow = async (req, res) => {
  try {
    const id = req.params.pid;
    const sqlQuery = "SELECT * FROM product_description Where pid=?";
    await databaseConnection.query(sqlQuery, id, (error, result) => {
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
// ================================Add Product ======================
const productDescDataPost = async (req, res) => {
  try {
    const productData = {
      pid: req.params.pid,
      description: req.body.description,
      color: req.body.color,
      size: req.body.size,
      weight: req.body.weight,
      mfg: req.body.mfg,
      expirydate: req.body.expirydate,
      modelname: req.body.modelname,
    };

    console.log("productData", productData);
    const sqlQuery = "INSERT INTO product_description SET?";
    await databaseConnection.query(sqlQuery, productData, (error, result) => {
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

// ================================Shop Product Update ======================
const productDescUpdate = async (req, res) => {
  try {
    const data = {
      description: req.body.description,
      color: req.body.color,
      size: req.body.size,
      weight: req.body.weight,
      mfg: req.body.mfg,
      expirydate: req.body.expirydate,
      modelname: req.body.modelname,
    };
    const id = [req.params.pid];
    const sqlQuery = "UPDATE product_description SET? where pid=?";
    await databaseConnection.query(sqlQuery, [data, id], (error, result) => {
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

//
module.exports = {
  productDescDatashow,
  productDescDataPost,
  productDescUpdate,
};
