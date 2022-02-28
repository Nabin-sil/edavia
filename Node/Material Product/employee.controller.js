const mongoose = require("mongoose");
const employeeModel = require("./employee.model");



exports.employees_get_all = (req, res, next) => { 
        employeeModel.find(function (err, employee) {
        if (err) {
        console.log(err);
        }
        else {   
        res.json(employee);
        }
        });
  };


exports.employees_create = (req, res, next) => {
    let employee = new employeeModel(req.body);
  employee.save()
 .then(game => {
 res.status(200).json({ 'employee': 'Material Product Added Successfully' });
 })
 .catch(err => {
 res.status(400).send("Something Went Wrong");
 });
 };


 exports.employees_get_by_id = (req, res, next) => { 
    let id = req.params.id;
    employeeModel.findById(id, function (err, employee) {
    res.json(employee);
 });
};

  
exports.employees_update = (req, res, next) => { 
    employeeModel.findById(req.params.id, function (err, employee) {
        if (!employee)
        return next(new Error('Unable To Find Employee With This Id'));
        else {
        employee.productName = req.body.productName;
        employee.category = req.body.category;
        employee.date = req.body.date;
        employee.freshness = req.body.freshness;
        employee.price = req.body.price;
        employee.comment = req.body.comment;
       
        employee.save().then(emp => {
        res.json('Material Updated Successfully');
        })
        .catch(err => {
        res.status(400).send("Unable To Update Employee");
        });
        }
        });
};



exports.employees_delete = (req, res, next) => { 
    employeeModel.findByIdAndRemove({ _id: req.params.id }, function (err, employee) {
        if (err) res.json(err);
        else res.json('Material product Deleted Successfully');
        });
};
