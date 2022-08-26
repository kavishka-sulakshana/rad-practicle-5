const passport = require('passport');
var LocalStrat = require('passport-local');
var sqlite3 = require('sqlite3').verbose();
var database = new sqlite3.Database('database.db');

passport.use(new LocalStrat((username, password, done) => {
    // find specific user data for a username
    database.get(`SELECT * FROM user WHERE username="${username}"`,(err,data)=>{
        if(err) return done(err);
        if(!data) return done(null, false);
        if(password == data.password) return done(null,data); // I didn't use a hashing method for encrypt passwords
        else return done(null,false);
    });
}));

passport.serializeUser((data, done) => done(null,data.id));

passport.deserializeUser((id,done)=>{
    done(null, database.get(`SELECT * FROM user WHERE id="${id}"`),(err, data)=>{
        return data;
    });
});

module.exports = passport;
