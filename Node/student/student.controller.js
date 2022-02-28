const mongoose = require("mongoose");
const Student = require("./student.model");


//get all students
exports.students_get_all = async (req, res, next) => {
    try{
    const studentData = await Student.find();
    res.status(200).send(studentData);
    }
    catch(err){
         res.status(400).send(err);
     }
 }


//get all Paricular students
exports.students_get_ById = async (req, res, next) => {
    try{
    const _id = req.params.id;
    const studentData =await Student.findById(_id);

    if(!studentData){
        return res.status(404).send();
    }else{
       res.status(200).send(studentData);
    }
    }
    catch(err){
         res.status(500).send(err);
     }
}



//post student
exports.students_Create = async (req, res, next) => {
    try{
    const user = new Student(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
    }
    catch(err){
         res.status(400).send(err);
     }
}


//update student
exports.students_Update = async (req, res, next) => {
    try{
    const _id = req.params.id;
    const updateStudent = await Student.findByIdAndUpdate(_id, req.body,{
        new:true
    });
    res.status(200).send(updateStudent);
    }
    catch(err){
         res.status(400).send(err);
     }
}


//Delete student
exports.students_Delete = async (req, res, next) => {
    try{
    const deleteStudent = await Student.findByIdAndDelete(req.params.id);
    if(!req.params.id){
        return res.status(400).send();
    }else{
    res.status(200).send(deleteStudent);
    }
}   catch(err){
         res.status(400).send(err);
     }
}


