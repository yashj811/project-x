const School = require("../models/SchoolModel");
exports.createSchool = async (req,res) => {
    const {name, address,code} = req.body;

    if(!name || !address || !code){
        return res.status(400).json({
            status: 400,
            success: false,
            message: "Please enter details",
          });
    }

    const school = await School.findOne({code: code});

    if(school){
            return res.status(400).json({
              status: 400,
              success: false,
              message: "User profile already exist.",
            });
    }

    
    try{
        const schoolDetails = new School({name,address,code});
         await School.create(schoolDetails);

        return res.status(200).json({
            status: 200,
            success: true,
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


exports.getAllSchools = async (req,res) => {


try{
    const schools = await School.find({});

    if(!schools){
        return res.status(404).json({
            status: 404,
            success: true,
            message: "No school record.",
          });

    }
    return res.status(200).json({
        status: 200,
        success: true,
        data: schools,
        message: "Schools found.",
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

exports.getSchoolById = async (req,res) => {
  const {id} = req.params;
if(!id){
  return res.status(400).json({
      status: 400,
      success: false,
      message: "Please provide details",
    });
}

try{
  const school = await School.findOne({_id : id});

  if(!school){
      return res.status(404).json({
          status: 404,
          success: true,
          message: "School not found.",
        });

  }
  return res.status(200).json({
      status: 200,
      success: true,
      data: school,
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

