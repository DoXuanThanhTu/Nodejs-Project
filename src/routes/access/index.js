"use strict";
const express = require("express");
const accessController = require("../../controllers/access.controller");
const router = express.Router();

//sign up
router.get("/shop/signup", accessController.signUp);
router.get("/", (req, res, next) => {
  return res.json({
    message: "index access route",
  });
});
module.exports = router;
