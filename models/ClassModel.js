const mongoose = require("mongoose");

const classSchema = mongoose.Schema({
    standard: {
        type: Number,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        deafult: 0,
    },
    vacant: {
        type: Number,
        required: true,
    },
    code: {
        type: String,
        unique: true,
        required: true,
    },
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "school",
        required: true
    }

}, { timestamps: true });



const Class = mongoose.model("class", classSchema);


module.exports = Class;