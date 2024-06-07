const express = require("express");
const customerRoute = express.Router();

const {
  getCustomer,
  postCustomer,
  updateCustomer,
  deleteCustomer,
  countTotalCustomers,
} = require("../controller/customer.controller");

customerRoute.get("/viewcustomer", getCustomer);
customerRoute.get("/totalcustomer", countTotalCustomers);
customerRoute.post("/addcustomer", postCustomer);
customerRoute.get("/upadtecustomer/:email", updateCustomer);
customerRoute.get("/deletecustomer/:email", deleteCustomer);

module.exports = { customerRoute };
