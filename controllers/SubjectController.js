const Subject = require("../models/SubjectModel");
exports.createSubject = async (req,res) => {

    const {name,code, schoolId} = req.body;

    if(!name || !code || !schoolId){
        return res.status(400).json({
            status: 400,
            success: false,
            message: "Please enter details",
          });
    }

    const subject = await Subject.findOne({code: code});

    if(subject){
            return res.status(400).json({
              status: 400,
              success: false,
              message: "Subject already exist.",
            });
    }

    
    try{
        const subjectDetails = new Subject({name,code,schoolId});
         await Subject.create(subjectDetails);

        return res.status(200).json({
            status: 200,
            success: true,
            message: "Subject added.",
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

exports.assignSubjectToClass = async (req,res) => {

    const {subjectId,classId} = req.body;

    if(!subjectId || !classId ){
        return res.status(400).json({
            status: 400,
            success: false,
            message: "Please enter details",
          });
    }

    const subject = await Subject.findOne({_id: subjectId});

    if(!subject){
            return res.status(400).json({
              status: 400,
              success: false,
              message: "Subject not found.",
            });
    }

    let updatedClasses;

    if(subject.classId && subject.classId.length > 0){
      if(subject.classId.includes(classId)){
        return res.status(400).json({
          status: 400,
          success: true,
          message: "Subject already assigned to class.",
        });
      }
        updatedClasses = [...subject.classId, classId];
    }else{
      let arr = [];
      arr[0] = classId;
        updatedClasses =arr;
    }


    
    try{
         await subject.updateOne({classId : updatedClasses});

        return res.status(200).json({
            status: 200,
            success: true,
            message: "Subject assigned to class.",
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


exports.getAllSubject = async (req,res) => {
try{
    const subjects = await Subject.find({});

    if(!subjects){
        return res.status(404).json({
            status: 404,
            success: true,
            message: "No subject record.",
          });

    }
    return res.status(200).json({
        status: 200,
        success: true,
        data: subjects,
        message: "Subjects found.",
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

exports.getSubjectBySubjecId = async (req,res) => {
  const {id} = req.params;
if(!id){
  return res.status(400).json({
      status: 400,
      success: false,
      message: "Please provide details",
    });
}

try{
  const subject = await Subject.findOne({_id : id});

  if(!subject){
      return res.status(404).json({
          status: 404,
          success: true,
          message: "Subject not found.",
        });

  }
  return res.status(200).json({
      status: 200,
      success: true,
      data: subject,
      message: "Subject found",
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


exports.getSubjectsBySchoolId = async (req,res) => {
    const {id} = req.params;
  if(!id){
    return res.status(400).json({
        status: 400,
        success: false,
        message: "Please provide details",
      });
  }
  
  try{
    const subjects = await Subject.find({schoolId : id});
  
    if(!subjects){
        return res.status(404).json({
            status: 404,
            success: true,
            message: "Subjects not found.",
          });
  
    }
    return res.status(200).json({
        status: 200,
        success: true,
        data: subjects,
        message: "Subjects found",
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

  exports.getSubjectsByClassId = async (req,res) => {
    const {id} = req.params;
  if(!id){
    return res.status(400).json({
        status: 400,
        success: false,
        message: "Please provide details",
      });
  }
  
  try{
    const subjects = await Subject.find({classId : {$in : [id]}});
  
    if(!subjects){
        return res.status(404).json({
            status: 404,
            success: true,
            message: "Subjects not found.",
          });
  
    }
    return res.status(200).json({
        status: 200,
        success: true,
        data: subjects,
        message: "Subjects found",
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

