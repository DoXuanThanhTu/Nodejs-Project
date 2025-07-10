const app = require("./src/app");
require("dotenv").config();
console.log(process.env.PORT);
const morgan = require("morgan");
// const {
//   app: { port },
// } = require("./src/configs/configMongodb.js");
const port = 3055;
// const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`Server is running in ${port}`);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Exit server");
  });
});
