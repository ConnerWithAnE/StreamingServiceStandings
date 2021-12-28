'use strict'

const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require('cors');

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



app.get('/createUserPassDatabase', (req, res) => {
    con.createCollection("UserPassDB", (err, result) => {
        if (err) throw err;
        else console.log(" Created Cred DB");
    })
})

app.post('/trysignin', (req, res) => {

    console.log("hit");


    let user = req.body.uName;
    let pass = req.body.uPass;

    let mongoQuery = {username: user, password: pass};

    res.send(JSON.stringify({passed:true}));
})

app.get('/createNetflixDatabase', (req, res) => {
    con.createCollection("NetflixDB", (err, result) => {
        if (err) throw err;
        else console.log("Created Netflix DB")
    })
})

app.get('/createPrimeDatabase', (req, res) => {
    con.createCollection("PrimeDB", (err, result) => {
        if (err) throw err;
        else console.log("Created Prime DB")
    })
})

app.get('/createDisneyDatabase', (req, res) => {
    con.createCollection("DisneyDB", (err, result) => {
        if (err) throw err;
        else console.log("Created Disney DB");
    })
})


console.log("Up and Running");
app.listen(PORT, HOST);