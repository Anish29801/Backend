const app = require("./app");
const mogodbConnection = require("./config/db");

mogodbConnection();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App at  ${PORT}`);
});
