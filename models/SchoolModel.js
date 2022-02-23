const mongoose = require("mongoose");


const schoolSchema = mongoose.Schema({

    name : {
        type: String,
        required: true,
    },
    address : {
        type : String,
        required: true,
    },
    code : {
        type : String,
        unique: true,
        required: true,
    }

},{timestamps : true});



const School = mongoose.model("school", schoolSchema);


module.exports = School;