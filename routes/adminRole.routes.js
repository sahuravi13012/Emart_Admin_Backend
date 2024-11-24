const express = require("express");

const adminRoleRoute = express.Router();

const {
  adminRoleGet,
  adminRolePost,
  adminRoleUpdate,
  adminRoleDelete,
  adminRoleGetById,
} = require("../controller/adminRole.controller");

adminRoleRoute.get("/viewrole", adminRoleGet);
adminRoleRoute.get("/viewrole/:roleid", adminRoleGetById);
adminRoleRoute.post("/addrole", adminRolePost);
adminRoleRoute.put("/updaterole/:roleid", adminRoleUpdate);
adminRoleRoute.delete("/deleterole/:roleid", adminRoleDelete);

module.exports = { adminRoleRoute };
