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
    .then(rooms => res.json(rooms))
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
      users: {[req.user.id]: {user_id: req.user.id,
        username: req.user.user}}
    });

    newRoom.save().then(room => res.json(room));
  }
);

router.get('/:room_id', (req, res) => {
   Room.findById(req.params.room_id)
  .then(room => {
    // debugger
    room.users.push(req.body.user_id)
    room.save().then(room => res.json(room))
}
  )


  

}
)

router.pos
module.exports = router
