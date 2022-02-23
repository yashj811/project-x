const Class = require("../models/ClassModel");
exports.createClass = async (req,res) => {

    const {standard,section,total,code, schoolId} = req.body;

    if(!standard || !section || !total || !code || !schoolId){
        return res.status(400).json({
            status: 400,
            success: false,
            message: "Please enter details",
          });
    }

    const classData = await Class.findOne({code: code});

    if(classData){
            return res.status(400).json({
              status: 400,
              success: false,
              message: "Class already exist.",
            });
    }

    
    try{
        const classDetils = new Class({standard,section,total,vacant: total,code, schoolId});
         await Class.create(classDetils);

        return res.status(200).json({
            status: 200,
            success: true,
            message: "Class added.",
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


exports.getAllClasses = async (req,res) => {


try{
    const classes = await Class.find({});

    if(!classes){
        return res.status(404).json({
            status: 404,
            success: true,
            message: "No school record.",
          });

    }
    return res.status(200).json({
        status: 200,
        success: true,
        data: classes,
        message: "classes found.",
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

exports.getClassByClassId = async (req,res) => {
  const {id} = req.params;
if(!id){
  return res.status(400).json({
      status: 400,
      success: false,
      message: "Please provide details",
    });
}

try{
  const classData = await Class.findOne({_id : id});

  if(!classData){
      return res.status(404).json({
          status: 404,
          success: true,
          message: "Class not found.",
        });

  }
  return res.status(200).json({
      status: 200,
      success: true,
      data: classData,
      message: "Classes found",
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


exports.getClassBySchoolId = async (req,res) => {
    const {id} = req.params;
  if(!id){
    return res.status(400).json({
        status: 400,
        success: false,
        message: "Please provide details",
      });
  }
  
  try{
    const classData = await Class.findOne({schoolId : id});
  
    if(!classData){
        return res.status(404).json({
            status: 404,
            success: true,
            message: "Class not found.",
          });
  
    }
    return res.status(200).json({
        status: 200,
        success: true,
        data: classData,
        message: "Classes found",
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

