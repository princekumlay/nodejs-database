//in this file we will define all the person schemas
// const express = require('express');
const mongoose = require('mongoose');

//here is the person schema
const personSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    age:{
        type: Number,
        require: true 
    },
    gender:{
        type: String,
        enum: ['Male', 'Female', 'Others']
    },
    email:{
        type: String, 
        require: true,
    },
    contact:{
        type: Number,
        require: true
    }
});

//now we will define the model using the personSchema
const Person = mongoose.model('Person', personSchema);


//model is exported
module.exports = Person;