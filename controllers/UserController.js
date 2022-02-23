const User = require("../models/UserModel");


exports.getAllUsers = async (req,res) => {


try{
    const users = await User.find({});

    if(!users){
        return res.status(404).json({
            status: 404,
            success: true,
            message: "No user record.",
          });

    }
    return res.status(200).json({
        status: 200,
        success: true,
        data: users,
        message: "Users found.",
      });



}catch(error){
    return res.status(500).json({
        status: 500,
        success: false,
        error: error,
        message: "Something went wrong.",
      });
}


}

exports.getUsersBySchoolId = async (req,res) => {
  const {id} = req.params;
if(!id){
  return res.status(400).json({
      status: 400,
      success: false,
      message: "Please provide details",
    });
}

try{
  const users = await User.find({schoolId : id});

  if(!users){
      return res.status(404).json({
          status: 404,
          success: true,
          message: "Users not found.",
        });

  }
  return res.status(200).json({
      status: 200,
      success: true,
      data: users,
      message: "School Registered.",
    });



}catch(error){
  return res.status(500).json({
      status: 500,
      success: false,
      error: error,
      message: "Something went wrong.",
    });
}


}

