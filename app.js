const express = require("express");
const app = express();
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const bodyParser = require('body-parser');
const users = require('./routes/api/users')
const rooms = require('./routes/api/rooms')
const games = require('./routes/api/games')
const passport = require('passport');
const path = require('path');
const cors = require('cors');

const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const Message = require('./models/Message');
const RoleDistribution = require('./models/RoleDistribution')
mongoose
  .connect(db, { 
    useUnifiedTopology: true,
    useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

  app.use(passport.initialize());
  require('./config/passport')(passport);
app.get("/", (req, res) => {
 
  return res.send("Hello ChatRoom")});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/users", users)
app.use("/api/rooms", rooms)
app.use("/api/games", games)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

const port = process.env.PORT || 5000;


io.on('connection', (socket) => {
  console.log('a user connected');
  Message.find().sort({createdAt: -1}).limit(20).exec((err, messages) => {
    if (err) return console.error(err);

    // Send the last messages to the user.
    socket.emit('init', messages);
  });

  // Listen to connected users for a new message.
  socket.on('message', (msg) => {
    console.log(msg)
    // Create a message with the content and the name of the user.
    const message = new Message({
      content: msg.content,
      user_id: msg.user_id,
      room_id: msg.room_id
    });

    // Save the message to the database.
    message.save((err) => {
      if (err) return console.error(err);
    });

    // Notify all other users about a new message.
    socket.broadcast.emit('push', msg);


  });
  socket.on('gamemode', (gm) => {
    console.log('game mode is on')        

    const gamemode = {
      room_id: gm.room_id,
      mode: true
    }
    socket.broadcast.emit('modeon', gamemode)
  })

});

server.listen(port, () => console.log(`Server is running on port ${port}`));

