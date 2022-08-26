var express = require('express');
var path = require('path')
var multer  = require('multer');

const PORT = 8000;
const app = express();
const upload = multer({dest:'uploads/'});

app.get('/',function(req,res) {
    res.sendFile('form.html',{root:path.join(__dirname)});
});

app.post('/submit',upload.single('file'),(req, res)=>{
    res.send(`<li>Form submitted </li> <br><br> email : ${req.body.email} <br> full name : ${req.body.name} <br> message : ${req.body.message}`);
});

app.listen(PORT,(error)=>{
    if(error) console.log('Error :',error);
    else console.log('server is running on',PORT);
});