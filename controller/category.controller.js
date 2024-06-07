const databaseConnection = require("../model/config");
const uuid = require("uuid").v4;
let getCategory = async (req, res) => {
  try {
    const sqlquery = "SELECT * FROM  category ";
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
let getCategoryName = async (req, res) => {
  try {
    const sqlquery = "SELECT category_name, category_id FROM  category ";
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

const postCategory = async (req, res) => {
  try {
    const { category_name, gst } = req.body;
    const image = req.file.location;
 
    const data = {
      category_id: uuid(),
      category_name,
      category_image: image,
      gst,
      date: new Date(),
    };
    const sqlquery = "INSERT INTO category SET ?";
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
let updateCategory = async (req, res) => {
  try {
 
    const data = [
      req.body.category_name,
      req.body.gst,
      req.file.location,
      req.params.category_id,
    ];
    const sqlquery =
      "UPDATE  category SET category_name =?,gst=?,category_image=?   WHERE category_id= ?";
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

let deleteCategory = async (req, res) => {
  try {
    const category_id = req.params.category_id;

    const sqlquery = `DELETE FROM category where category_id= '${category_id}'`;

    await databaseConnection.query(sqlquery, (err, result) => {
      if (err) {
        return res.send({ Error: err.sqlMessage });
 
      }
      res.send({ status: 200, response: result });
    });
  } catch (err) {
    res.send(err.sqlMessage);
    
  }
};
module.exports = {
  getCategoryName,
  getCategory,
  postCategory,
  updateCategory,
  deleteCategory,
};
