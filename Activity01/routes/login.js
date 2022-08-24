var express = require('express');
const  passport  = require('../passport');
var path = require('path')
var router = express.Router();

router.get('/',(req, res)=>{
    res.sendFile('/login.html');
});

router.post('/password', passport.authenticate('local',{
    successRedirect : '/home',
    failureRedirect : '/login'
}));

module.exports = router;