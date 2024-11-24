const express = require("express");
const usersRoutes = express.Router();

const {
  getUsers,
  addUsers,
  adminRoleAssignUpdate,
  adminRoleAssignDelete,
  updateUsersStatus,
  countTotalUser,
  UserLogin,
  userDelete,
} = require("../controller/users.controller");
usersRoutes.get("/viewusers", getUsers);
usersRoutes.get("/totalausers", countTotalUser);
usersRoutes.post("/addusers", addUsers);
usersRoutes.post("/userlogin", UserLogin);
usersRoutes.post("/updateusers", adminRoleAssignUpdate);
usersRoutes.put("/updateuserstatus/:id/status", updateUsersStatus);
usersRoutes.delete("/deleteuserrole/:id", adminRoleAssignDelete);
usersRoutes.delete("/deleteusers/:id", userDelete);

module.exports = { usersRoutes };
