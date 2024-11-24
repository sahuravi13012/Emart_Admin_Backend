const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const path = require("path");
const multer = require("multer");
let s3 = new AWS.S3({
  credentials: {
    accessKeyId: "AKIAQAX7DH5L6XODE5PY",
    secretAccessKey: "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",
  },
  region: "ap-south-1",
});
//  ---------------------------- For Product Image ----------------------------
const productS3Storage = multerS3({
  s3: s3,
  bucket: "e-mart/product",
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
  bucket: "e-mart/category",
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
  bucket: "e-mart/subcategory",
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
  bucket: "e-mart/users",
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
  bucket: "e-mart/retailers",
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
