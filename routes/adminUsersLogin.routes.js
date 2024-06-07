const express = require("express");

const usersRoute = express.Router();

const {
  adminLoginGet,
  adminLoginPost,
  adminLoginUpdate,
  adminLoginDelete,
  adminLoginStatusUpdate,
  adminLoginPasswordUpdate,
} = require("../controller/adminUserLogin.controller");

usersRoute.get("/viewuser", adminLoginGet);
usersRoute.post("/adduser", adminLoginPost);
usersRoute.put("/updateuser/:id", adminLoginUpdate);
usersRoute.patch("/updateuserstatus/:id", adminLoginStatusUpdate);
usersRoute.patch("/adminpasswordupdate/:id", adminLoginPasswordUpdate);
usersRoute.delete("/adminlogin/:id", adminLoginDelete);

module.exports = { usersRoute };
