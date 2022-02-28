const mongoose = require('mongoose');
const validator = require('validator');

const studentSchema = mongoose.Schema({
    name: { type: String, 
           required: true,
           minlength:3
             },
    email: { type: String,
            required: true,
            unique:[true, "Email already exists"],
             validate(value){
                 if(!validator.isEmail(value)){
                     throw new Error("Invalid email");
                 }
             } },
    phone: { type: Number, minlength:10,  required: true }
});

module.exports = mongoose.model('Student', studentSchema);




