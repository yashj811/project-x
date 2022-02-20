const {
    getHashedPassword,
    isPasswordMatch,
  } = require("../utils/HashPassword");
  const { signToken } = require("../utils/JWTTokenUtility");
  const UserProfile = require("../models/UserProfileModel");
const { roleMap } = require("../utils/ContantMaps");
  
  exports.createProfile = async (req, res) => {
    const {  userId, firstName,middleName, lastName, address, phoneNumber, emailId, gender } = req.body;
    if (!userId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Please enter details",
      });
    } else {
      try {
        const userProfile = await UserProfile.findOne({ userId: userId });
        if (userProfile) {
          return res.status(400).json({
            status: 400,
            success: false,
            message: "User profile already exist.",
          });
        }
      } catch (error) {
        console.log(error)
        return res.status(500).json({
          status: 500,
          success: false,
          error: error,
          message: "Soemthing went wrong.",
        });
      }
  
      let newUserProfile = new UserProfile({
        userId, firstName,middleName, lastName, address, phoneNumber, emailId, gender 
      });
      await newUserProfile.save((err, userProfile) => {
        if (err) {
          return res.status(500).json({
            status: 500,
            success: false,
            message: "Please try again later.",
          });
        }
        return res.status(200).json({
          status: 200,
          success: true,
          message: "Profile Registered.",
        });
      });

    }
  };
  
  exports.getProfile = async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Please enter details",
      });
    } else {
      try {
        const userProfile = await UserProfile.findOne({ userId: userId}).populate('userId');
        if (!userProfile) {
          return res.status(400).json({
            status: 400,
            success: false,
            message: "User  does not exist. Please register.",
          });
        }
  
          return res.status(200).json({
            status: 200,
            success: true,
            message: "Got profile.",
            data: userProfile,
          });
      } catch (error) {
        return res.status(500).json({
          status: 500,
          success: false,
          message: "Something went wrong.",
        });
      }
    }
  };
  