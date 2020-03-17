const express = require("express");
const app = express();
const http = require('http').Server(app);
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const bodyParser = require('body-parser');
const users = require('./routes/api/users')
const rooms = require('./routes/api/rooms')
const passport = require('passport');
const path = require('path');
const io = require('socket.io')(http);
const Message = require('./models/Message');

mongoose
  .connect(db, { 
    useUnifiedTopology: true,
    useNewUrlParser: true })
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
io.on('connection', (socket) => {

  Message.find().sort({createdAt: -1}).limit(10).exec((err, messages) => {
    if (err) return console.error(err);

    // Send the last messages to the user.
    socket.emit('init', messages);
  });

  // Listen to connected users for a new message.
  socket.on('message', (msg) => {
    // Create a message with the content and the name of the user.
    const message = new Message({
      content: msg.content,
      user: msg.user_id,
      room: msg.room_id
    });

    // Save the message to the database.
    message.save((err) => {
      if (err) return console.error(err);
    });

    // Notify all other users about a new message.
    socket.broadcast.emit('push', msg);
  });
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
