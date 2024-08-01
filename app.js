// import express
const express = require("express");

// import body-parser
const bodyParser = require("body-parser");

// start app
const app = express();

// set port
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static("public"));

// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const routes = require("./lib/routes");
app.use("/", routes);

// listen on port
app.listen(port, () => {
  console.log(`Server is running on port ${port}. http://localhost:${port}`);
});
