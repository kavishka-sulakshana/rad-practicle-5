var express = require('express');
var passport = require('passport');
var login = require('./routes/login');
var path = require('path');
var session = require('express-session');
var SQLiteStore = require('connect-sqlite3')(session);
var app = express();

app.use(express.static(path.join(__dirname )));

app.use('/login',login);

app.use(passport.authenticate('session'));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({ db: 'sessions.db', dir: './' })
}));



app.get('/',(req,res)=>{
    res.send('Go to login page');
});

app.get('/home',(req,res)=>{
    res.send('This is Homepage');
});

app.listen(8000, ()=>{
    console.log('app is running on 8000');
});


module.exports = express;