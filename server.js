const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const methodOverride = require("method-override");
require("dotenv").config();
const Shoe = require("./models/shoe.js");
require("./db/connection.js");

const shoeController = require("./controllers/shoe.controller.js");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(morgan("tiny"));

// Routes
app.use("/shoes", shoeController);

app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.get("*slug", (req, res) => {
  res.render("error.ejs", {
    message: "That page does not exist, please click back and try again",
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
