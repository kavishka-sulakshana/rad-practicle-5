var session = require('express-session');
var express = require('express');
var bcrypt = require('bcrypt');
var passport = require('./passport');
var path = require('path');
var sqlite3 = require('sqlite3');

const database = new sqlite3.Database('database.db'); //sqlite database for save user data
const app = express();
const saltRounds = 10;
const PORT = 8000;

app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname ))); // static path initialization

// session data
app.use(session({
  secret: 'hello world',
  resave: true,
  saveUninitialized: false,
  cookie : {
    
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// for index.html page
app.get('/',(req,res)=>{
    res.sendFile('index.html',{root:path.join('public')});
});

app.get('/home',(req,res,next)=>{
    // track view count
    if(req.session.views){
        req.session.views++;
        res.send(`You visited this page ${req.session.views} times`)
    }else{
        req.session.views = 1;
        res.send('Welcome to this page first time');
    }
    res.end();
});

//for login page
app.get('/login',(req, res)=>{
    res.sendFile('login.html',{root:path.join('public')});
});

//for register page
app.get('/register',(req, res)=>{
    res.sendFile('register.html',{root:path.join('public')});
});

app.post('/register', (req, res)=>{
    // save user data to database
    database.serialize(()=>{
        database.get("SELECT id FROM user ORDER BY id DESC",(err,data)=>{
            let stmt = database.prepare("INSERT INTO user(id,username, password) VALUES (?,?,?)");
            bcrypt.genSalt(saltRounds, (err, salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    stmt.run(++(data.id),req.body.username,hash);
                    stmt.finalize((err)=>{
                        if(err) console.log("error registering ! -> ",err);
                        else res.redirect('/login');
                    });
                });
            });
        });
        /*
            database.each("SELECT * FROM user",(err,data)=>{
                console.log(data.id+"\t"+data.username+"\t"+data.password);
            });
        */
    });
});

// passport authentication for login 
app.post('/login/auth', passport.authenticate('local',{
    successRedirect:'/home',    // redirect to home if success
    failureRedirect:'/login',   // redirect back to login if faliure
}));

app.listen(PORT, (error)=>{
    if(error) console.log('Error :',error);
    else console.log('server is running on',PORT);
});

module.exports = express;