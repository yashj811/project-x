const mongoose = require("mongoose");

const userProfileSchema = mongoose.Schema({
  userId : {type: mongoose.Schema.Types.ObjectId , ref:"user"},
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  middleName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  emailId: {
    type: String,
    required: true,
    trim: true,
  },
});

const UserProfile = mongoose.model("UserProfile", userProfileSchema);
(async () => {
  await UserProfile.createCollection();
})


module.exports = UserProfile;
