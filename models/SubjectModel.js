const mongoose = require("mongoose");


const subjectSchema = mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    code : {
        type: String,
        unique: true,
        required: true,
    },
    classId : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'class',
    }],
    schoolId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'school',
        required: true
    }
},{timestamps : true});



const Subject = mongoose.model("subject", subjectSchema);


module.exports = Subject;