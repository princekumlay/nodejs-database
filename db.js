//this file is responsible for the connection between the nodejs server and mongodb server
// const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// const LocalURL = 'mongodb://127.0.0.1:27017/business'; 
// const OnlineURL = 'mongodb+srv://anshuman123:<anshuman1234>@business.borfhlt.mongodb.net/'
// const URL = process.env.LOCALURL; 
const URL = process.env.ONLINEURL; 


//it will initialize the connection to the database
mongoose.connect(URL);


//it is a default object maintained by the mongoose for the connection to the database and it will handle all the events
const db = mongoose.connection;


//defining some of the event listeners of  mongoose
db.on('open', () => {
    console.log("connected successfully");
});
db.on('close', () => {
    console.log("disconnected");
});
db.on('error', () => {
    console.log("internal error connecting to the database");
});



//exporting the default object
module.exports = db;