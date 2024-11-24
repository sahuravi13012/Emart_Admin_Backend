const express = require("express");
const productRoutes = express.Router();
const { uploadProductImage } = require("../configS3/S3_config");
const { authenticateToken } = require("../middleware/retailerMiddleware");
const {
  productDatashow,
  productDataPost,
  ShopavAvailableQuantityUpdate,
  shopViewavAilableQuantity,
  productUpdate,
  productdescDatashow,
  getlimitUser,
} = require("../controller/product.controller");

productRoutes.get("/viewproduct", authenticateToken, productDatashow);
productRoutes.get("/shopviewavailqty/:retailer_id", shopViewavAilableQuantity);
productRoutes.get("/shopviewavailqty/", shopViewavAilableQuantity);
productRoutes.post(
  "/addproduct",
  uploadProductImage.single("image"),
  productDataPost
);
productRoutes.put(
  "/shopproductupdate/:pid",
  uploadProductImage.single("image"),
  productUpdate
);
productRoutes.get("/allproductdatashow/:pid", productdescDatashow);
productRoutes.get("/dataproduct", getlimitUser);

productRoutes.put(
  "/shopavailqtyupdate/:retailer_id/:pid",
  ShopavAvailableQuantityUpdate
);

module.exports = { productRoutes };
