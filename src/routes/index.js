"use strict";
const express = require("express");
const router = express.Router();
const accessRoutes = require("./access/index.js");
router.use("/v1/api", accessRoutes);
router.get("/", (req, res) => {
  res.status(200).json("app is running");
});
module.exports = router;
