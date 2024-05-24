const mongoose = require('mongoose');

//schema for the gym students
const gymbrosSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true 
    },
    age:{
        type: Number,
        require: true 
    },
    weight:{
        type: Number
    },
    height:{
        type: Number,
        require: true 
    },
    level:{
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced']
    },
    mobile:{
        type: Number,
        require: true
    }
});


//defining model for the above schema
const Gymbros = mongoose.model('Gymbros', gymbrosSchema);

module.exports = Gymbros;