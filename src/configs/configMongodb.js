const config = {
  app: {
    port: process.env.PORT,
  },
  db: {
    connectString:
      process.env.MONGO_URI ||
      "mongodb+srv://tudxtworkspace:ULz69aQXHG5TxLQB@maincluster.tvrxtvw.mongodb.net/",
  },
};
module.exports = config;
