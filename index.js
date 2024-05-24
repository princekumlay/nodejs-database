//this is a server file of js 
//in this file we will define the app code

const express = require('express');
const bodyParser = require('body-parser');
const personRouter = require('./routers/personRouter');
const gymbrosRouter = require('./routers/gymbrosRouter');
require('dotenv').config();

const app = express();


const db = require('./db')
app.use(bodyParser.json()); //it will extract data from http body and convert it into javascript object

//HERE WE WILL DEFINE ALL THE ROUTES OF THE APP
app.get("/", (req, res) => {
    res.send("Hello World!");
});


//accessing different routes through express router
app.use('/', personRouter);
app.use('/', gymbrosRouter);



const port = process.env.PORT || 3000;
//app is listening the requests at the port 3000
app.listen(port, () => { 
    console.log("app is running on port 3000");
})