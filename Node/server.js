﻿require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const authorize = require('_helpers/authorize');
const errorHandler = require('_helpers/error-handler');
require("dotenv").config();
const path = require("path");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
//app.use(express.json());



// use JWT auth to secure the api
app.use(authorize());

const directory = path.join(__dirname, './uploads');
app.use("/uploads", express.static(directory));
app.use('/material', require('./Material Product/employee.routes'));
app.use('/student', require('./student/student.routes'));



// api routes
app.use('/users', require('./users/users.controller'));
app.use('/products', require('./Product/product.routes'));


// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

