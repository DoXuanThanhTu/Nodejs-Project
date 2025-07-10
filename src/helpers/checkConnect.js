"use strict";
const _SECOND = 5000;
const os = require("os");
const process = require("process");
const mongoose = require("mongoose");
//count connect
const countConnect = () => {
  const numConnect = mongoose.connections.length;
  console.log(`Number of connection : ${numConnect}`);
};

//check overload connect
const checkOverload = () => {
  setInterval(() => {
    const numConnect = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;
    //Example maximum number of connect based on number of osCores
    const maxConnection = numCores * 5;
    console.log(`Active connection:${numConnect}`);
    mongoose.connections.forEach((conn, idx) => {
      console.log(`Connection[${idx}]: readyState=${conn.readyState}`);
    });

    console.log(`Memory usage:${memoryUsage / 1024 / 1024} MB`);
    if (numConnect > maxConnection) {
      console.log("Connection overload detected!");
    }
    // console.log(numConnect, numCors, memoryUsage);
  }, _SECOND); //Monitor every 5 seconds
};
module.exports = {
  countConnect,
  checkOverload,
};
