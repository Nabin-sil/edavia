const express = require("express");
const router = express.Router();
const authorize = require('../_helpers/authorize');
const studentController = require('./student.controller');


router.get("/",  studentController.students_get_all);

router.post("/add", studentController.students_Create);

router.get("/:id", studentController.students_get_ById);

router.patch("/:id", studentController.students_Update);

router.delete("/:id", studentController.students_Delete);

module.exports = router;





