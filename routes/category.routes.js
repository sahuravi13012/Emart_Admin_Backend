const express = require("express");
const categoryRoute = express.Router();
const { uploadCategoryImage } = require("../configS3/S3_config");

const {
  getCategory,
  postCategory,
  updateCategory,
  deleteCategory,
  getCategoryName
} = require("../controller/category.controller");

categoryRoute.get("/viewcategory", getCategory);
categoryRoute.get("/viewcategoryname", getCategoryName);
categoryRoute.post(
  "/addcategory",
  uploadCategoryImage.single("category_image"),
  postCategory
);
categoryRoute.put(
  "/upadatecategory/:category_id",
  uploadCategoryImage.single("category_image"),
  updateCategory
);
categoryRoute.delete("/deletecategory/:category_id", deleteCategory);

module.exports = { categoryRoute };
