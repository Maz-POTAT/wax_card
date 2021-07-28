const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const server = require('http').Server(app);

// import database from "./config/database";
const routes = require("./routes");

// require("dotenv");

const port = process.env.PORT || 3000;
const baseUrl = '0.0.0.0';

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.use(express.static(path.resolve(__dirname, "../src/assets")));

server.listen(port, baseUrl, () => {
  console.log("server is listening on port 3000");
});
