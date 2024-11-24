const databaseConnection = require("../model/config");

//==============================All Shop Registersion View=============

const productDatashow = async (req, res) => {
  try {
    const id = req.retailer_id;
    console.log("retialerid", id);
    const sqlQuery = "SELECT * FROM product where retailer_id = ?";
    await databaseConnection.query(sqlQuery,id, (error, result) => {
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

//==============================All  product data View and product_desc=============
const productdescDatashow = async (req, res) => {
  try {
    const Id = req.params.pid;
    const sqlQuery =
      "select pid,retailer_id,price,available_quantity,subcategory_id,item_name,company,image,description,color,size,weight,mfg,expirydate,modelname from product natural join product_description where pid=?";
    await databaseConnection.query(sqlQuery, Id, (error, result) => {
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

//=======================================shop View avAilable Quantity=======================
const shopViewavAilableQuantity = async (req, res) => {
  try {
    let retailerId = req.params.retailer_id;
    const sqlQuery =
      "SELECT available_quantity,COUNT(available_quantity) FROM product WHERE retailer_id=?";
    await databaseConnection.query(sqlQuery, retailerId, (error, result) => {
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

// ================================Add Product ======================
const productDataPost = async (req, res) => {
  try {
    const min = 1000000; // Minimum 7-digit value
    const max = 9999999; // Maximum 7-digit value

    const randomId = Math.floor(Math.random() * (max - min + 1) + min);
    const product_id = randomId.toString();
    const productData = {
      pid: product_id,
      retailer_id: req.body.retailer_id,
      price: req.body.price,
      available_qty: req.body.available_qty,
      subcategory_id: req.body.subcategory_id,
      item_name: req.body.item_name,
      company: req.body.company,
      image: req.file.location,
    };
    const sqlQuery = "INSERT INTO product SET?";
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
const productUpdate = async (req, res) => {
  try {
    const data = {
      retailer_id: req.body.retailer_id,
      price: req.body.price,
      available_quantity: req.body.available_quantity,
      subcategory_id: req.body.subcategory_id,
      item_name: req.body.item_name,
      company: req.body.company,
      image: req.file.location,
    };
    let uid = req.params.pid;
    let sqlQuery = "UPDATE product SET ? WHERE pid = ?";
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

//===============================shop Status update=====================
const ShopavAvailableQuantityUpdate = async (req, res) => {
  try {
    const data = [
      req.body.available_quantity,
      req.params.retailer_id,
      req.params.pid,
    ];
    const sqlQuery =
      "UPDATE product SET available_quantity= ? where retailer_id=? and pid=?  ";
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

let getlimitUser = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;
  getPaginateData("product", page, limit, (data) => {
    res.json(data);
  });
};

const getPaginateData = (table, page, limit, cb) => {
  const offset = (page - 1) * limit;

  const qCount = `SELECT COUNT(*) AS total FROM ${table}`;
  const qData = `SELECT * FROM ${table} LIMIT ${limit} OFFSET ${offset}`;

  databaseConnection.query(qCount, (err, countResult) => {
    if (err) {
      cb({ error: err });
    } else {
      databaseConnection.query(qData, (err, dataResult) => {
        if (err) {
          cb({ error: err });
        } else {
          const total = countResult[0].total;
          const pages = Math.ceil(total / limit);

          const data = {
            total: total,
            current_page: page,
            per_page: limit,
            last_page: pages,
            data: dataResult,
          };
          cb(data);
        }
      });
    }
  });
};

module.exports = {
  productDatashow,
  productDataPost,
  ShopavAvailableQuantityUpdate,
  shopViewavAilableQuantity,
  productUpdate,
  productdescDatashow,
  getlimitUser,
};
