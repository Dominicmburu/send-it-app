const express = require('express');
const dotenv = require("dotenv");
const smsRoute = require("./smsRoute");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();
const port = process.env.PORT || 6000;

app.listen(port, () => console.log(`SMS server running on port: ${port}`));

app.use(bodyParser.json());

app.use("/", smsRoute);