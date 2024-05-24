// this file will contains all the routes for the person schema

const express = require('express');
const Person = require('../models/personSchema');
const router = express.Router();


//HERE WE WILL DEFINE ALL THE END POINTS OF THE PERSON SCHEMA

//this is post request through which the data can be send to the database and store it for later CRUD operations
router.post('/person', async(req, res) => {
    try{
          //first we extract data from the http request body
          const data = req.body;

          //now we will create a new person
          const newPerson = new Person(data);

          //now we save this data to the database
          const response = await newPerson.save();
          console.log("data save successfully to business database and Person Collection");
          res.status(200).json({response});
    }
    catch(err){
          console.error(err);
          res.status(500).json({error: "Internal server error"});
    }
});

//this is the route that fetched the data from the database for the Person collection
router.get('/person', async(req, res) => {
    try {

        //fetching data form the database
        const data = await Person.find();
        console.log("data fetched successfully from Person Collection");
        res.status(200).json({data});

    } catch (err) {
        console.error(err);
        res.status(500).json({error:"Internal server error"});
    }
});


//here we will define parameterised API call for the person schema
router.get('/person/:gender', async(req, res) => {
    try {
        //first we will get the value of gender from the http request as
        const genderExtracted = req.params.gender;

        //check gender matched to the available gender
        if(genderExtracted == 'Male' || genderExtracted == 'Female' || genderExtracted == 'Others'){
            const response = await Person.find({gender: genderExtracted});
            console.log("data fetched successfully from Person collection for : " + genderExtracted + " category");
            res.status(200).json({response});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Internal server error"});
    } 
});

//lets define the update operation on the database using the http request though the route
router.put('/person/:id', async(req, res) => {
    try {
        //first we extract the id of the record that is going to be update from the http request
        const personId = req.params.id;
        //also extract data that is going to be add
        const data = req.body;

        //once id is fetched then we look for the response
        const response = await Person.findByIdAndUpdate(personId, data, {
            new: true, 
            runValidators: true
        });

        //checking whether the person with the id exist or not
        if(!response){
            res.status(404).json({error: "Invalid id"});
        }
        else{
            console.log("Data updated successfully in Person collection for : " + personId);
            res.status(200).json({response});
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Internal server error"});
    }
});

//route to delete the data from the database
router.delete('/person/:id', async(req, res) => {
    try {
        //extreacting id  
        const personId = req.params.id;
        
        //find person correspond to id and delete from database
        const response = await Person.findByIdAndDelete(personId);

        if(!response){
            res.status(404).json({error: "Invalid id"});
        }
        else{
            console.log("data deleted successfully from the Person collection for : "+ personId);
            res.status(200).json({response});
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Internal server error"});
    }
})



//exporting the router
module.exports = router;