const express = require("express");
const adminUserProfileRoute = express.Router();

const {
  adminUserProfileGet,
  adminUserProfileUpdate,
  adminUserProfileDelete,
  adminUserProfilePost,
  adminUserProfilePhotoUpdate,
} = require("../controller/adminUserProfile.controller");

adminUserProfileRoute.get("/adminuserprofile", adminUserProfileGet);
adminUserProfileRoute.get("/adminuserprofile", adminUserProfilePost);
adminUserProfileRoute.get("/adminuserprofile/:id", adminUserProfilePhotoUpdate);
adminUserProfileRoute.get("/adminuserprofile/:id", adminUserProfileUpdate);
adminUserProfileRoute.get("/adminuserprofile/:id", adminUserProfileDelete);

module.exports = {adminUserProfileRoute}