require("dotenv").config();
const indexRoute = require("./routes/index.js");
const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const app = express();
// console.log("Process::", process.env);
//init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression()); //compress payload
//init db
require("./db/init.mongodb.js");

//init route
app.use("/", require("./routes"));
// app.get("/", (req, res, next) => {
//   const strCompression = "Hello";
//   return res.status(200).json({
//     message: "server is running",
//     metadata: strCompression.repeat(10000),
//   });
// });
//handling error
module.exports = app;
