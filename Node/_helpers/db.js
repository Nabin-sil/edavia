const config = require('config.json');
const mongoose = require('mongoose');

const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions)
.then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
  });
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    MaterialProduct: require('../Material Product/employee.model'),
    Student: require('../student/student.model'),


    
};