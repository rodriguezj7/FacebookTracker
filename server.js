const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const issue = require('./model/issue')

/**
 * ! Grab data from mongoDatabase URI
 *
 * * require("./config/keys") returns  { mongURI: 'string'}
 * * monogData has mongoURI value which is a string
 *
* @private
 */
const mongoData = require("./config/keys").mongoURI;

mongoose
  .connect(
    mongoData, {
      useNewUrlParser: true
    }
  )
  .then(() => console.log("DB is connected"))
  .catch(err => console.log(err));

/**
 * ! Setting up body parser as top-level middleware
 *
 */
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());



app.listen(port, () => console.log(`Server is listening on ${port}`));