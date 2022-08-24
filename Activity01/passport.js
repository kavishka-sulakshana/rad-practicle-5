var passport = require('passport');
var crypto = require('crypto');
var LocalStrat = require('passport-local');
var sqlite3 = require('sqlite3').verbose();
var database = new sqlite3.Database('database.db');
// var database = require('./database.db');

passport.use(new LocalStrat((username, password, done) => {
    database.get(`SELECT password FROM user WHERE username="${username}"`,(err,data)=>{
        // if(err) {console.log(err);return done(err);}
        // if(!data) {console.log('no shit');return done(null, false);}
        // if(!(crypto.timingSafeEqual(data.password,password))) {console.log('hello');return done(null,false);}
        return done(null,data);
    });
}));



module.exports = passport;
