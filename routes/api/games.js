const express = require("express");
const router = express.Router();
const passport = require('passport')



const Role = require('../../models/Role');
const RoleTheme = require('../../models/RoleTheme')
const RoleDistribution = require('../../models/RoleDistribution')

router.get("/test", (req,res) => {
    res.json({msg: "this is the game router"})
})

router.get('/roleplay/', (req, res) => {
  RoleTheme.find()
    .sort({ date: -1 })
    .then(themes => {
      const themesRes = {};
      themes.forEach((theme) => {
        themesRes[theme._id] = theme;
      });
      return res.json(themeRes);
    })
    .catch(err => res.status(404).json({ noThemesfound: 'No themes found' }));
});



router.post('/roleplay/:theme_id', (req, res) => {
   Role.find({theme_id:req.params.theme_id})
  .then(roles => {
        Room.findById(req.body.room_id).then(room =>
      {const roleDisRes = (room, roles) => {
        let primes = roles.fileter(role => role.type === "Prime")
        const nonPrimes = roles.fileter(role => role.type !== "Prime")
        const roleDisRes = {}
        room.forEach(user_id => {
            if(primes) {
                const idx =  Math.floorMath.random() * (primes.length - 1)
                roleDisRes[user_id] = primes[idx]
                primes = primes.slice(0, idx).concat(primes.slice(idx+1))
            }
            else{
                const idx = Math.floorMath.random() * (nonPrimes.length - 1)
                roleDisRes[user_id] = nonPrimes[idx]
            }
        
        }) 
        new RoleDistribution({
            distribution:roleDisRes
        })
    }
    return res.json(roleDisRes)
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



router.pos
module.exports = router
