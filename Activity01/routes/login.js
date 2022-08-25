var express = require('express');
const  passport  = require('passport');
var path = require('path')
var router = express.Router();

router.get('/',(req, res)=>{
    res.sendFile('login.html',{root:path.join('public')});
});

router.post('/auth', (req,res)=>{
    if(req.body.username == )
});

module.exports = router;