const express = require("express");
const router = express.Router();
const passport = require('passport')



const Role = require('../../models/Role');
const RoleTheme = require('../../models/RoleTheme')
const RoleDistribution = require('../../models/RoleDistribution')
const Room = require('../../models/Room')

router.get("/test", (req,res) => {
    res.json({msg: "this is the game router"})
})

router.get('/roleplay/', (req, res) => {
  RoleTheme.find()
    // .sort({ date: -1 })
    .then(themes => res.json(themes))
    .catch(err => res.status(404).json({ noThemesfound: 'No themes found' }));
})

router.post('/roleplay/', (req, res) => {
  // console.log(req.body)
  const newTheme = new RoleTheme({
    theme:req.body.theme
  })

  newTheme.save().then(theme => res.json(theme))
})

router.post('/roleplay/roles', (req, res) => {

  const newRole = new Role({
    theme_id:req.body.theme_id,
    name: req.body.name,
    role_avator_id: req.body.role_avator_id
  })

  newRole.save().then(role => res.json(role))
})

router.post('/roleplay/:theme_id', (req, res) => {
  // console.log(req.params.theme_id)
   Role.find({theme_id:req.params.theme_id})
  .then(roles => {
    // console.log(req.body.room_id)
    Room.findById(req.body.room_id).then(room =>
      {
        // console.log(roles)
        // console.log(room)
        let primes = roles.filter(role => role.type === "Prime")
        const nonPrimes = roles.filter(role => role.type !== "Prime")
        const roleDis = {}
        room.users.forEach(user_id => {
            if(primes) {
                const idx =  Math.floor(Math.random() * (primes.length ))
                roleDis[user_id] = primes[idx]
                primes = primes.slice(0, idx).concat(primes.slice(idx+1))
            }
            else{
                const idx = Math.floor(Math.random() * (nonPrimes.length ))
                roleDis[user_id] = nonPrimes[idx]
            }
        
        }) 
        const roleDisRes = new RoleDistribution({
            distribution:roleDis,
            room_id: room._id
        })
        roleDisRes.save().then(roles => res.json(roles))
    

});
})
    .catch(err => res.status(404).json({ noThemesfound: 'No roles found' }));
});
// router.post('/:room_id', (req, res) => {
//   Room.findById(req.params.room_id)
//  .then(room => {
//    // 
//    if (!room.users.includes(req.body.user_id) && req.body.user_id) room.users.push(req.body.user_id)
//    room.save().then(room => res.json(room))
//  })
// })

router.get('/roleplay/:room_id',(req, res) => {
  console.log(req.params.room_id)
  RoleDistribution.findOne({room_id: req.params.room_id})
  // .sort({date:-1}).limit(1)

  .then(distribution => {
    console.log(distribution)
    res.json(distribution)
  })
})

router.delete('/roleplay/:room_id',(req, res) => {

  RoleDistribution.deleteMany({room_id: req.params.room_id})
  .then(distribution => {
    console.log(distribution)
    res.json(distribution)
  })
} )


router.pos
module.exports = router
