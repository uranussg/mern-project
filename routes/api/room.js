const express = require("express");
const router = express.Router();

const Room = require('../../models/Room');
const validateRoomInput = require('../../validation/room');

router.get("/test", (req,res) => {
    res.json({msg: "this is the room router"})
})

router.post('/', (req, res) => {
  const { errors, isValid } = validateRoomInput(req.body);
  
  if (!isValid) {
    return res.status(400).json(errors);
  }
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
    const { errors, isValid } = validateRoomInput(req.title);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newRoom = new Room({
      title: req.body.title,
      user: req.user.id
    });

    newRoom.save().then(room => res.json(room));
  }
);

module.exports = router
