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
const Room = require('./models/Room')
mongoose
  .connect(db, { 
    useUnifiedTopology: true,
    useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

  app.use(passport.initialize());
  require('./config/passport')(passport);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
  }

app.get("/", (req, res) => {
  return res.send("Hello ChatRoom")});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/users", users)
app.use("/api/rooms", rooms)
app.use("/api/games", games)


const port = process.env.PORT || 5000;


io.on('connection', (socket) => {
  console.log('a user connect')
  socket.on('join-room', roomData => {
      
      // console.log(roomData.room_id)
    socket.join(roomData.room_id)
    Room.findById(roomData.room_id)
    .then(room => {
        if (roomData.user_id) {
            if (!(room.users.includes(roomData.user_id)) ) 
            {
                room.users.push(roomData.user_id)
            }
            }
 
    room.save().then(() => io.to(roomData.room_id).emit('update-room-info', roomData))
    })
    // Message.find({room_id:roomData.room_id}).sort({date: -1}).limit(20).exec((err, messages) => {
    // if (err) return console.error(err);    
    // // Send the last messages to the user.
    // socket.emit('init', messages);

    // });
  })
  socket.on('disconnect', ()=> {
    console.log('user disconnect')
  })

  socket.on('exit-room', (roomData) => {
    socket.leave(roomData.room_id)
    Room.findById(roomData.room_id)
    .then(room => {

      // if (roomData.user_id) {
        if (room.users.includes(roomData.user_id) ) 
        {
          const idx = room.users.indexOf(roomData.user_id)
          room.users = room.users.slice(0, idx).concat(room.users.slice(idx+1))
        //   if(!room.users.length){
        //       Room.deleteOne({_id:room._id})
        //   }
         }
         
      //  }
      room.save().then(() => io.to(roomData.room_id).emit('update-room-info', roomData))
    })
  })


  // Listen to connected users for a new message.
  socket.on('message', (msg) => {
    // console.log(msg)
    // Create a message with the content and the name of the user.
    // const message = new Message({
    //   content: msg.content,
    //   user_id: msg.user_id,
    //   room_id: msg.room_id
    // });
    // console.log(message)
    // // Save the message to the database.
    // message.save((err) => {
    //   if (err) return console.error(err);
    // });
    // Notify all other users about a new message.
    socket.to(msg.room_id).emit('push', msg);


  });


  socket.on('gamemode', (gm) => {
    Room.findByIdAndUpdate(gm.room_id, {access: gm.mode})     

    const gamemode = {
      room_id: gm.room_id,
      mode: gm.mode
    }
    socket.to(gamemode.room_id).emit('modeon', gamemode)
  })

});

server.listen(port, () => console.log(`Server is running on port ${port}`));

