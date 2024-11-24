const express = require("express");
const offerZoneRoute = express.Router();
const {
  OfferGet,
  OfferPost,
  offerUpdate,
  offerDelete,
} = require("../controller/offerZones.contoller");

offerZoneRoute.get("/offer", OfferGet);
offerZoneRoute.post("/offer", OfferPost);
offerZoneRoute.put("/offer/:offercode", offerUpdate);
offerZoneRoute.delete("/offer/:offercode", offerDelete);

module.exports = { offerZoneRoute };