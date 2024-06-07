const express = require("express");
const multer = require("multer");
const path = require("path");
const productDescRoutes = express.Router();
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

const {
productDescDatashow,
productDescDataPost,
productDescUpdate
} = require("../controller/productDescription.controller");

const awsConfig = {
  accessKeyId: "AKIARSQVLXUR5UERHDWE",
  secretAccessKey: "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",
  region: "ap-south-1",
  bucketName: "sanjeev00000",
};

let S3 = new AWS.S3(awsConfig);
let upload = multer({
  storage: multerS3({
    bucket: "sanjeev00000",
    s3: S3,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    acl: "public-read",
    key: (req, file, cb) =>
      cb(
        null,
        `${file.fieldname}${Date.now()}${path.extname(file.originalname)}`
      ),
  }),
});

// productRoutes.get("/shopproduct", productDatashow);
productDescRoutes.get("/shopprodectdesc/:pid", productDescDatashow);
productDescRoutes.post("/addproductdesc", productDescDataPost);
productDescRoutes.put("/productdescupdate/:pid", productDescUpdate);
// productRoutes.get("/shopviewavailqty/", shopViewavAilableQuantity);
// productRoutes.patch(
//   "/shopavailqtyupdate/:retailer_id/:pid",
//   ShopavAvailableQuantityUpdate
// );

module.exports = { productDescRoutes };