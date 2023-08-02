const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    Admin:{
        type:Boolean,
        require :false,
        default:false
    }
})

module.exports = mongoose.model('User',userSchema)