/*
 Run this file and create the database before all.
*/

var sqlite3 = require('sqlite3');
var sqlDB = sqlite3.verbose();
var bcrypt = require('bcrypt');
var dbName = "database.db";

const saltRounds = 10;
const database = new sqlDB.Database(dbName);

database.serialize(() => {
    database.run("CREATE TABLE user (id INT PRIMARY KEY, username VARCHAR(50), password VARCHAR(255))");

    let stmt = database.prepare("INSERT INTO user VALUES (?,?,?)"); // template for insert data

    // sample data list
    let usrnmarr = ['kavi','kamal','amal','nimal','sunil'];
    let passwdarr = ['1234','4321','4545','0000','7889'];

    for (let i = 0; i < 5; i++) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(passwdarr[i], salt, (err, hash) => {
                stmt.run(i+1, usrnmarr[i], hash );
                stmt.finalize((err)=>{
                    if(err) console.log("error occured ! -> ",err);
                });
            });
        });
    }; // make 5 data rows in user table
    

    database.each("SELECT * FROM user",(err,data)=>{
        console.log(data.id+"\t"+data.username+"\t"+data.password);
    });
});

// database.close();