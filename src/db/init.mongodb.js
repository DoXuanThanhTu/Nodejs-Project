"use strict";
const { db } = require("../configs/configMongodb.js");
const mongoose = require("mongoose");
const { countConnect, checkOverload } = require("../helpers/checkConnect.js");
const connectString = db.connectString;
class Database {
  constructor() {
    this.connect();
  }
  //connect
  connect(type = "mongodb") {
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
    mongoose
      .connect(connectString, { maxPoolSize: 50 })
      .then(() => {
        console.log("Connect mongodb success");
        // countConnect();
        // checkOverload();
      })
      .catch((err) => console.log("Error connect"));
  }
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}
const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;
