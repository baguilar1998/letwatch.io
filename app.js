// Package Imports
const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Allows servers to communicate with each other
app.use((req, res, next) =>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

//Route imports
const roomRoute = require('./routes/room');


//Express Routes for REST API
app.use('/api/room',roomRoute);


/**
 * Database setup
 * User-admin
 * password-MNP2Aal0wkOsPCol
 */
const uri = "mongodb+srv://admin:MNP2Aal0wkOsPCol@cluster0-rkeb2.mongodb.net/test?retryWrites=true";
mongoose.connect(uri, { useNewUrlParser: true}).then(()=>{
  console.log("connected to the database");
}).catch(()=>{
  console.log("connection")
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.status);
});

module.exports = app;
