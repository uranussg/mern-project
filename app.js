const express = require("express");
const app = express();
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const bodyParser = require('body-parser');
const users = require('./routes/api/users')
const rooms = require('./routes/api/rooms')
const passport = require('passport');
const path = require('path');

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

  app.use(passport.initialize());
  require('./config/passport')(passport);
app.get("/", (req, res) => {
  // console.log(req)
  // debugger
  return res.send("Hello ChatRoom")});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/users", users)
app.use("/api/rooms", rooms)

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
