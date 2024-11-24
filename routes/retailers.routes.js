const express = require("express");
const retailerRoute = express.Router();
const { uploadRetailerImage } = require("../configS3/S3_config");
const { authenticateToken } = require("../middleware/retailerMiddleware");

const {
  getRetailer,
  postRetailer,
  updateRetailer,
  deleteRetailer,
  countTotalRetailers,
  updateStatus,
  loginRetailer,
  verifyRetailer,
} = require("../controller/retailers.controller");

retailerRoute.get("/viewretailer", getRetailer);
retailerRoute.get("/checktoken", authenticateToken, verifyRetailer);
retailerRoute.post("/loginretailer", loginRetailer);
retailerRoute.get("/totalretailer", countTotalRetailers);

retailerRoute.post(
  "/addretailers",
  uploadRetailerImage.fields([
    {
      name: "profile_photo",
    },
    { name: "registration_doc" },
  ]),
  postRetailer
);
retailerRoute.put("/updatestatus/:retailerid/status", updateStatus);
retailerRoute.get("/upadteretailer/:retailerid", updateRetailer);
retailerRoute.delete("/deleteretailer/:retailerid", deleteRetailer);

module.exports = { retailerRoute };
