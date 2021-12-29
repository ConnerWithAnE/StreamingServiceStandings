'use strict'

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const nodemailer = require('nodemailer');

const { createHash, scryptSync, randomBytes, timingSafeEqual } = require('crypto');

const url = 'mongodb://toor:root@mongostreaming:27017';

const app = express();
const bodyParser = require("body-parser");

const PORT = 8080;
const HOST = '0.0.0.0';


//Enables Server to receive from other addresses
app.use(cors());

app.use(bodyParser.urlencoded({
    extended:true
}));

//Establishing DB connection
let con;
MongoClient.connect(url, (err, db) => {
    con = db.db("mongostreaming");
})


app.post('/usersignin', (req, res) => {

    /*
        ~Responses~
        [*]  0 = Successful login
        [*]  1 = Error Occurred
        [*]  2 = Password is 
        [*]  3 = Username does not exist in database
    */

    let user = req.body.uName;
    let pass = req.body.uPass;

    let mongoQuery = {username: user};
    new Promise((resolve, reject) => {
        con.collection("UserPassDB").find(mongoQuery).toArray((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    }).then((result) => {
        console.log(typeof(result));
        if (Object.keys(result).length !== 0) {
            console.log(result);
            Object.keys(result).forEach((e) => {
                const [salt, key] = result[e].password.split(':');
                const hashedBuffer = scryptSync(pass, salt, 64);

                const keyBuffer = Buffer.from(key, 'hex');
                const match = timingSafeEqual(hashedBuffer, keyBuffer);

                if (match) {
                    res.send(JSON.stringify({code:0}))
                } else {
                    res.send(JSON.stringify({code:2}))
                }
            })
        } else {
            console.log("No User");
            res.send(JSON.stringify({code:3}))
        }
    }).catch((error) => {

    })
    
})

app.post('/usersignup', (req, res) => {

    /*
        ~Responses~
        [*]  0 = Successful Sign Up
        [*]  1 = Error Occurred
        [*]  2 = Unused Unsuccessful
        [*]  3 = Username already exists
    */

    const username = req.body.uName;

    console.log(req.body);
    console.log(username);
    console.log(req.body.uPass);

    const salt = randomBytes(16).toString('hex');
    const hashedPassword = scryptSync(req.body.uPass, salt, 64).toString('hex');

    const mongoQuery = {username: username, password: `${salt}:${hashedPassword}`};

    new Promise((resolve, reject) => {
        con.collection("UserPassDB").find({username: username}).toArray((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    }).then((result) => {
        console.log(result);
        if (Object.keys(result).length === 0) {
            new Promise((resolve, reject) => {
                con.collection("UserPassDB").insertOne(mongoQuery, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            }).then((result) => {
                res.send(JSON.stringify({code:0}));
            }).catch((err) => {
                res.send(JSON.stringify({code:2}));
            })
        } else {
            res.send(JSON.stringify({code:3}));
        }
    }).catch((err) => {
        res.send(JSON.stringify({code:1}));
    })

})



app.get('/createuserpassdatabase', (req, res) => {

    console.log("UserPass DB create HIT");

    new Promise((resolve, reject) => {
        con.createCollection("UserPassDB", (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result);
            }
        })
    }).then((result) => {
        console.log("User/Pass database created");
        res.send(JSON.stringify({created:true}));
    }).catch((err) => {
        console.log("User/Pass database NOT created");
        res.send(JSON.stringify({created:false}));
    })
})

app.get('/createnetflixdatabase', (req, res) => {

    console.log("Netflix DB create HIT");

    new Promise((resolve, reject) => {
        con.createCollection("NetflixDB", (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result);
            }
        })
    }).then((result) => {
        console.log("Netflix database created");
        res.send(JSON.stringify({created:true}));
    }).catch((err) => {
        console.log("Netflix database NOT created");
        res.send(JSON.stringify({created:false}));
    })
})

app.get('/createprimedatabase', (req, res) => {

    console.log("Prime DB create HIT");

    new Promise((resolve, reject) => {
        con.createCollection("PrimeDB", (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result);
            }
        })
    }).then((result) => {
        console.log("Prime database created");
        res.send(JSON.stringify({created:true}));
    }).catch((err) => {
        console.log("Prime database NOT created")
        res.send(JSON.stringify({created:false}));
    })
})

app.get('/createdisneydatabase', (req, res) => {

    console.log("Prime DB create HIT");

    new Promise((resolve, reject) => {
        con.createCollection("DisneyDB", (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result);
            }
        })
    }).then((result) => {
        console.log("Disney database created");
        res.send(JSON.stringify({created:true}));
    }).catch((err) => {
        console.log("Disney database NOT created");
        res.send(JSON.stringify({created:false}));
    })
})

console.log("Up and Running");
app.listen(PORT, HOST);