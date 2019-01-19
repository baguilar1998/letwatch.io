// Package Imports
const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const router = express.Router();


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
const roomRoute = require('./server/routes/room');
const userRoutes = require('./server/routes/users');


//Express Routes for REST API
app.use('/api/room',roomRoute);
app.use('/api', userRoutes);


/**
 * Database setup
* User - letswatchdevteam@gmail.com
 * password-MNP2Aal0wkOsPCol
 */



const uri = "mongodb://admin:KvhvUh34!@ds157544.mlab.com:57544/letswatch";
mongoose.connect(uri, { useNewUrlParser: true}).then(()=>{
   console.log("connected");
}).catch(()=>{
  console.log("error occured");
});

router.get('/', function(req, res){
  res.send("working");
})


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
  // res.sendStatus(err.status)
  res.status(err.status || 500);
  res.send(err.status);
});

module.exports = app;
