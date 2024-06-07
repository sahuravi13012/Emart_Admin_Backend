const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
require("aws-sdk/lib/maintenance_mode_message").suppress = true;
const path = require("path");
const multer = require("multer");
let s3 = new AWS.S3({
  credentials: {
    accessKeyId: "AKIAYUZWQ7TLJSQL3QMV",
    secretAccessKey: "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",
  },
  region: "ap-south-1",
});
//  ---------------------------- For Product Image ----------------------------
const productS3Storage = multerS3({
  s3: s3,
  bucket: "ecombuckets/product",
  acl: "public-read",
  metadata: (req, file, cb) => {
    cb(null, { fieldname: file.fieldname });
  },
  key: (req, file, cb) =>
    cb(
      null,
      `${file.fieldname}${Date.now()}${path.extname(file.originalname)}`
    ),
});

const uploadProductImage = multer({
  storage: productS3Storage,
});

//  ---------------------------- For Category Image ----------------------------
const categoryS3Storage = multerS3({
  s3: s3,
  bucket: "ecombuckets/category",
  acl: "public-read",
  metadata: (req, file, cb) => {
    cb(null, { fieldname: file.fieldname });
  },
  key: (req, file, cb) =>
    cb(
      null,
      `${file.fieldname}${Date.now()}${path.extname(file.originalname)}`
    ),
});

const uploadCategoryImage = multer({
  storage: categoryS3Storage,
});

//  ---------------------------- For SubCategory Image ----------------------------
const subCategoryS3Storage = multerS3({
  s3: s3,
  bucket: "ecombuckets/subcategory",
  acl: "public-read",
  metadata: (req, file, cb) => {
    cb(null, { fieldname: file.fieldname });
  },
  key: (req, file, cb) =>
    cb(
      null,
      `${file.fieldname}${Date.now()}${path.extname(file.originalname)}`
    ),
});

const uploadSubCategoryImage = multer({
  storage: subCategoryS3Storage,
});

//  ---------------------------- For User Registration Image ----------------------------
const userRegistrationS3Storage = multerS3({
  s3: s3,
  bucket: "ecombuckets/users",
  acl: "public-read",
  metadata: (req, file, cb) => {
    cb(null, { fieldname: file.fieldname });
  },
  key: (req, file, cb) =>
    cb(
      null,
      `${file.fieldname}${Date.now()}${path.extname(file.originalname)}`
    ),
});

const uploadUserImage = multer({
  storage: userRegistrationS3Storage,
});

//  ---------------------------- For Retailers Registration Image ----------------------------
const retailerRegistrationS3Storage = multerS3({
  s3: s3,
  bucket: "ecombuckets/retailers",
  acl: "public-read",
  metadata: (req, file, cb) => {
    cb(null, { fieldname: file.fieldname });
  },
  key: (req, file, cb) =>
    cb(
      null,
      `${file.fieldname}${Date.now()}${path.extname(file.originalname)}`
    ),
});

const uploadRetailerImage = multer({
  storage: retailerRegistrationS3Storage,
});

module.exports = {
  s3,
  uploadProductImage,
  uploadCategoryImage,
  uploadRetailerImage,
  uploadSubCategoryImage,
  uploadUserImage,
};
