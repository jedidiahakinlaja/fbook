const mongoose = require ("mongoose");
const uniqueValidator =require('mongoose-unique-validator')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dob:{
        type:Date
    },
    image:{
        type:String
    }

})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('userDetails', userSchema, 'user');