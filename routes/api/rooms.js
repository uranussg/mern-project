const express = require("express");
const router = express.Router();
const passport = require('passport')


const Room = require('../../models/Room');
const validateRoomInput = require('../../validation/room');

router.get("/test", (req,res) => {
    res.json({msg: "this is the room router"})
})

router.get('/', (req, res) => {
  Room.find()
    .sort({ date: -1 })
    .then(rooms => {
      const roomsRes = {};
      rooms.forEach((room) => {
        roomsRes[room._id] = room;
      });
      return res.json(roomsRes);
    })
    .catch(err => res.status(404).json({ notRoomsfound: 'No rooms found' }));
});

router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateRoomInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newRoom = new Room({
      title: req.body.title,
      // users: {[req.body.user.id]: {user_id: req.body.user.id,
      //   username: req.body.user.username}}
      users: [req.body.user_id]
    });

    newRoom.save().then(room => res.json(room));
  }
);

router.post('/:room_id', (req, res) => {
   Room.findById(req.params.room_id)
  .then(room => {
    // 
    if (!room.users.includes(req.body.user_id) && req.body.user_id) room.users.push(req.body.user_id)
    room.save().then(room => res.json(room))
  })
})

// router.post('/:room_id', (req, res) => {
//   Room.findById(req.params.room_id)
//  .then(room => {
//    // 
//    if (!room.users.includes(req.body.user_id) && req.body.user_id) room.users.push(req.body.user_id)
//    room.save().then(room => res.json(room))
//  })
// })

router.patch('/:room_id', (req, res) => {
  Room.findById(req.params.room_id)
 .then(room => {
   // 

   if (req.body.user_id) {

     if (room.users.includes(req.body.user_id) ) 
     {
       const idx = room.users.indexOf(req.body.user_id)
       room.users = room.users.slice(0, idx).concat(room.users.slice(idx+1))
      }
      else {
        room.users.push(req.body.user_id)
      }
    }
   room.save().then(room => res.json(room))
 })
})

router.pos
module.exports = router
