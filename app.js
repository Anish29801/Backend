require("dotenv").config();
const express = require("express");
const cookiePraser = rquire("cookie-parser")
const cors = require("cors");
const morgon = require("morgan");


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

module.exports = app;