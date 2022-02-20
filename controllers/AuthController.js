const {
    getHashedPassword,
    isPasswordMatch,
  } = require("../utils/HashPassword");
  const { signToken } = require("../utils/JWTTokenUtility");
  const User = require("../models/UserModel");
const { roleMap } = require("../utils/ContantMaps");
  
  exports.register = async (req, res) => {
    const {  password, userName, role } = req.body;
    if (!role || !password || !userName) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Please enter details",
      });
    } else {
      try {
        const user = await User.findOne({ userName: userName });
        if (user) {
          return res.status(400).json({
            status: 400,
            success: false,
            message: "User already exist.Please login.",
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
  
      const hashedPassword = await getHashedPassword(password);
      let newUser = new User({
        role: roleMap[role],
        password: hashedPassword,
        userName: userName,
      });
      await newUser.save((err, user) => {
        if (err) {
          return res.status(500).json({
            status: 500,
            success: false,
            message: "Please try again later.",
          });
        }
      });

        return res.status(200).json({
          status: 200,
          success: true,
          message: "User Registered.",
        });
    }
  };
  
  exports.login = async (req, res) => {
    const { userName, password, role } = req.body;
    if (!userName || !password || !role) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Please enter details",
      });
    } else {
      try {
        const user = await User.findOne({ userName: userName, role: roleMap[role] });
        if (!user) {
          return res.status(400).json({
            status: 400,
            success: false,
            message: "User does not exist. Please register.",
          });
        }
  
        const isMatch = await isPasswordMatch(password, user.password);
        if (isMatch) {
          const token = await signToken(user);
          return res.status(200).json({
            status: 200,
            success: true,
            message: "Logged in.",
            data: { token: token, user: user },
          });
        } else {
          return res.status(400).json({
            status: 400,
            success: false,
            message: "Password incorrect. Please try again.",
          });
        }
      } catch (error) {
        return res.status(500).json({
          status: 500,
          success: false,
          message: "Something went wrong.",
        });
      }
    }
  };
  