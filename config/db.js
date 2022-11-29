const mongoose = require("mongoose");

const dbConnetion = () => {
  // process.env.DB_URL ||
  const { DB_URL } = process.env;
  mongoose
    .connect(DB_URL)
    .then(console.log(`DB Connected Sucessfully`))
    .catch((error) => {
      console.log(`DB Connection Error : ${error}`);
      process.exit(1);
    });

  mongoose.connection.on("error", (err) => {
    if (err) {
      console.log(err);
    }
  });
};

module.exports = dbConnetion;
