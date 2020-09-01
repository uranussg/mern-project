// import io from '../../app'
const express = require("express");
const router = express.Router();
const passport = require('passport')
const axios = require('axios')


const Room = require('../../models/Room');
const validateRoomInput = require('../../validation/room');

router.get("/test", (req,res) => {
    res.json({msg: "this is the room router"})
})

router.post('/invite', (req, res) => {
  axios({
    method: 'post',
    url: 'https://api.shorten.rest/aliases?aliasName=6a0e/@rnd',
    data: {
      "destinations": [
        {
          "url": req.body.url,
          "country": null,
          "os": null
        }
      ]
    },
    headers: {
      'x-api-key': 'ab46e3c0-eb8c-11ea-848b-bd68a368ea0b',
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      return res.json({inviteLink: response.data.shortUrl});
    })
    .catch(error => {
      console.log(error);
    });
});

router.get('/:option', (req, res) => {
  console.log(req.params.option )
  const filter = req.params.option === 'all'? {} : {game:''}
  // console.log(filter)
  Room.find(filter)
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
      users: [req.body.user_id],
      game: ""
    });


    newRoom.save().then(room => res.json(room));
  }
);

router.post('/:room_id', (req, res) => {
   Room.findById(req.params.room_id)
  .then(room => {
    if (!room.users.includes(req.body.user_id) && req.body.user_id) room.users.push(req.body.user_id)
    room.save().then(room => res.json(room))
  }).catch(err => res.status(404).json({ notRoomsfound: 'No rooms found' }));
})


router.patch('/:room_id', (req, res) => {
  
  Room.findById(req.params.room_id)
 .then(room => {
   if (req.body.user_id) {
     if (!(room.users.includes(req.body.user_id)) ) 
     {
        room.users.push(req.body.user_id)
      }
    } 
   room.save().then(room => res.json(room))
 }).catch(err => res.status(404).json({ notRoomsfound: 'No rooms found' }));
// .then(room => res.json(room))
})

router.patch('/:room_id/exit', (req, res) => {
  Room.findById(req.params.room_id)
  // .then(room => {
  //   if (req.body.user_id) {
  //     if (room.users.includes(req.body.user_id) ) 
  //     {
  //       const idx = room.users.indexOf(req.body.user_id)
  //       room.users = room.users.slice(0, idx).concat(room.users.slice(idx+1))
  //       }
        
  //     }
  //   room.save().then(room => res.json(room))
  // })
  .then(room => res.json(room)).catch(err => res.status(404).json({ notRoomsfound: 'No rooms found' }));
})

router.pos
module.exports = router
