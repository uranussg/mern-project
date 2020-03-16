const express = require("express");
const gameroom = express();
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const bodyParser = require('body-parser');

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));
gameroom.get("/", (req, res) => res.send("Hello ChatGame"));

gameroom.use(bodyParser.urlencoded({ extended: false }));
gameroom.use(bodyParser.json());

const port = process.env.PORT || 5000;
gameroom.listen(port, () => console.log(`Server is running on port ${port}`));
