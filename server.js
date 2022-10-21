const dotenv = require("dotenv");
dotenv.config();
const app = require("./app");
const mongoose = require("mongoose");

// connect mongodb
mongoose
  .connect(process.env.MONGODB_SERVER)
  .then(() => console.log("connected to MOngoDB"))
  .catch((err) => console.log("Connection Failed !!"));

// server run er code
const port = process.env.PORT || 3301;

app.listen(port, () => {
  console.log(`listening from ${port}.... `);
});

// {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   }
