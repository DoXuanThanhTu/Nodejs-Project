"use strict";
const mongoose = require("mongoose");
const connectString =
  "mongodb+srv://tudxtworkspace:ULz69aQXHG5TxLQB@maincluster.tvrxtvw.mongodb.net/";
mongoose
  .connect(connectString)
  .then(() => {
    console.log("Connect MongoDB success");
  })
  .catch((err) => console.log("Error connect"));

//dev
if (1 === 1) {
  mongoose.set("debug", true);
  mongoose.set("debug", { color: true });
}
module.exports = mongoose;
