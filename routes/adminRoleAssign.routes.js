const express = require("express");

const adminRoleAssignRoute = express.Router();

const {
  adminRoleAssignGet,
  adminRoleAssignPost,
  adminRoleAssignUpdate,
  adminRoleAssignDelete,
  userRoleAssign,
} = require("../controller/adminRoleAssign.contoller");

adminRoleAssignRoute.get("/viewroleassign", adminRoleAssignGet);
adminRoleAssignRoute.get("/viewuserroleassign/:id", userRoleAssign);
adminRoleAssignRoute.post("/addroleassign", adminRoleAssignPost);
adminRoleAssignRoute.put("/adminroleassign/:id", adminRoleAssignUpdate);
adminRoleAssignRoute.delete(
  "/deleteroleassign/:id/:roleid",
  adminRoleAssignDelete
);

module.exports = { adminRoleAssignRoute };
