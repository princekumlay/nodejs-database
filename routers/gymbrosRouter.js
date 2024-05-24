//in this file we will define all the routes of the gym member

const express = require('express');
const Gymbros = require('../models/gymbrosSchema')
const router = express.Router();

//defining all the routes like post, get, put and delete
router.post('/gymbros', async(req, res) => {
    try{
          //first we extract data from the http request body
          const data = req.body;

          //now we will create a new gym member
          const newMember = new Gymbros(data);

          //now we save this data to the database
          const response = await newMember.save();
          console.log("data save successfully in gymbros collection of business database");
          res.status(200).json({response});
    }
    catch(err){
          console.error(err);
          res.status(500).json({error: "Internal server error"});
    }
});


router.get('/gymbros', async(req, res) => {
    try {

        //fetching data form the database
        const data = await Gymbros.find();
        console.log("data fetched successfully from gymbros Collection");
        res.status(200).json({data});

    } catch (err) {
        console.error(err);
        res.status(500).json({error:"Internal server error"});
    }
});



router.get('/gymbros/:level', async(req, res) => {
    try {
        //first we will get the value of level from the http request as
        const levelExtracted = req.params.level;

        //check level matched to the available level
        if(levelExtracted == 'Beginner' || levelExtracted == 'Intermediate' || levelExtracted == 'Advanced'){
            const response = await Gymbros.find({level: levelExtracted});
            console.log("data fetched successfully from gymbros collection for : "+levelExtracted + " level");
            res.status(200).json({response});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Internal server error"});
    }
});



router.put('/gymbros/:id', async(req, res) => {
    try {
        //first we extract the id of the record that is going to be update from the http request
        const gymbrosId = req.params.id;
        //also extract data that is going to be add
        const data = req.body;

        //once id is fetched then we look for the response
        const response = await Gymbros.findByIdAndUpdate(gymbrosId, data, {
            new: true, 
            runValidators: true
        });

        //checking whether the person with the id exist or not
        if(!response){
            res.status(404).json({error: "Invalid id"});
        }
        else{
            console.log("Data updated successfully in gymbros collection for : " + gymbrosId);
            res.status(200).json({response});
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Internal server error"});
    }
});



router.delete('/gymbros/:id', async(req, res) => {
    try {
        //extreacting id  
        const gymbrosId = req.params.id;
        
        //find person correspond to id and delete from database
        const response = await Gymbros.findByIdAndDelete(gymbrosId);

        if(!response){
            res.status(404).json({error: "Invalid id"});
        }
        else{
            console.log("Gymbros data deleted successfully from gymbros collection for : "+gymbrosId);
            res.status(200).json({response});
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Internal server error"});
    }
});


module.exports = router;
