const mongoose = require("mongoose");

const userProfileSchema = mongoose.Schema({
  userId : {type: mongoose.Schema.Types.ObjectId , ref:"user", required: true},
  firstName: {
    type: String,
    trim: true,
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  currentAddress: {
    type: String,
    trim: true,
  },
  permanentAddress: {
    type: String,
    trim: true,
  },
  isAddressSame : {
    type: Boolean,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  emailId: {
    type: String,
    trim: true,
  },
  dateOfBirth : {
    type: Date,
  },
  dateOfJoining : {
    type: Date,
  },
  idProofNumber : {
    type: String,
  },
  idProofType: {
    type: String,
  },
  userType: {
    type: String,
  }
},{timestamps : true});

const UserProfile = mongoose.model("UserProfile", userProfileSchema);
(async () => {
  await UserProfile.createCollection();
})


module.exports = UserProfile;
