const databaseConnection = require("../model/config");
const uuid = require("uuid").v4;
let getSubCategory = async (req, res) => {
  try {
    const sqlquery =
      "SELECT sc.subcategory_id, sc.category_id, sc.subcategory_name,sc.subcategory_image,c.category_name,sc.date FROM  subcategory as sc, category as c where sc.category_id = c.category_id ";
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

// let getSubCategory = async (req, res) => {
//   try {
//     const sqlquery =
//       "SELECT sc.subcategory_id, sc.category_id, sc.subcategory_name,sc.subcategory_image,c.category_name,sc.date FROM  subcategory as sc, category as c where sc.category_id = c.category_id";
//     await databaseConnection.query(sqlquery, (err, result) => {
//       if (err) {
//         res.send({ Error: err.sqlMessage });
//       }
//       res.send({ Status: 200, Response: result });
//     });
//   } catch (err) {
//     res.send(err.sqlMessage);
//   }
// }

const postSubCategory = async (req, res) => {
  try {
    let data = {
      subcategory_id: uuid(),
      subcategory_name: req.body.subcategory_name,
      category_id: req.body.category_id,
      subcategory_image: req.file.location,
      date: new Date(),
    };
    
    console.log("data", data);
    const sqlquery = "INSERT INTO  subcategory SET ?";
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
let updateSubCategory = async (req, res) => {
  try {
    const data = [
      req.body.subcategory_name,
      req.body.category_id,
      req.file.location,
      req.params.subcategory_id,
    ];
    console.log("data", data);
    const sqlquery =
      "UPDATE  subcategory SET subcategory_name =?,category_id=?,subcategory_image=?   WHERE subcategory_id= ?";
    await databaseConnection.query(sqlquery, data, (err, result) => {
      if (err) {
        return res.send({ Error: err.sqlMessage });
        console.log(err.sqlMessage);
      }
      res.send({ status: 200, response: result });
    });
  } catch (err) {
    res.send(err.sqlmessage);
  }
};

let deleteSubCategory = async (req, res) => {
  try {
    const data = [req.params.subcategory_id, req.params.category_id];
    console.log("data", data);
    const sqlquery =
      "DELETE subcategory, category FROM subcategory INNER JOIN category ON subcategory.category_id = category.category_id WHERE subcategory.subcategory_id =? AND category.category_id =?";
    console.log("sqlquery", sqlquery);
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
  getSubCategory,
  postSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
