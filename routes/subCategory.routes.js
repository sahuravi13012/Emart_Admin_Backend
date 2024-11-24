const express = require("express");
const subCategoryRoute = express.Router();
const { uploadSubCategoryImage } = require("../configS3/S3_config");
const {
  getSubCategory,
  postSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("../controller/subCategory.controller");

subCategoryRoute.get("/viewsubcategory", getSubCategory);
subCategoryRoute.post(
  "/addsubcategory",
  uploadSubCategoryImage.single("subcategory_image"),
  postSubCategory
);
subCategoryRoute.put(
  "/upadtesubcategory/:subcategory_id",
  uploadSubCategoryImage.single("subcategory_image"),
  updateSubCategory
);
subCategoryRoute.delete(
  "/deletesubcategory/:subcategory_id/:category_id",
  deleteSubCategory
);

module.exports = { subCategoryRoute };
