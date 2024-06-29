const express = require("express");
const app = express();
const dotenv = require("dotenv");
const port = 3000;
const mongoose = require("mongoose");

dotenv.config();
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to Mongo"))
  .catch(() => console.log("Error connecting to Mongo"));

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
