const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: Number,
    default: 0, //      {0: admin , 1: student, 2: teacher}
  },
  schoolId : {
    type : mongoose.Schema.Types.ObjectId, 
    ref:"school", 
    required: true
  }
},{timestamps : true});

const User = mongoose.model("user", userSchema);
(async () => {
  await User.createCollection();
})


module.exports = User;
