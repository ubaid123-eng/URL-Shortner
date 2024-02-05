const express = require("express");
const route = express.Router();

const {
  CreateUrlShortner,
  AnalysticUrl,
  RedicrectUrlShortner,
} = require("../controllers/urlShort");

route.post("/url", CreateUrlShortner);
route.get("/:shortid", RedicrectUrlShortner);
route.get("/analytics/:shortid", AnalysticUrl);

module.exports = route;
