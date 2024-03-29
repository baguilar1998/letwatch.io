// Package Imports
const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const router = express.Router();

//Package required for socket.io
const http = require('http').Server(express);
const io = require('socket.io')(http);


var app = express();
// Allows us to use the web socket in any route
app.set("io",io);
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
const playlistRoute = require('./server/routes/playlist');
const emailRoute = require('./server/routes/email');


//Express Routes for REST API
app.use('/api/room',roomRoute);
app.use('/api', userRoutes);
app.use('/api/playlist',playlistRoute);
app.use('/api/email',emailRoute);

//Listening on connection event for incoming sockets
let currentUser;
io.on("connection", (socket) => {
  console.log("A user is connected");

  /**
   * -----------------------------
   * Room Sockets
   * -----------------------------
   */

   /**
    * Users see other users joining the room
    * @emits the user that joined the room
    */
  socket.on("joinRoom", (user)=>{
    currentUser=user;
    // console.log(currentUser);
    io.emit("joinRoom",user);
  });

  socket.on("leaveRoom", (objData)=>{
    console.log("User that is leaveing: " + objData.user);
    console.log("Room Id: " + objData.roomId);
    io.emit("leaveRoom", objData.user);
  });

  // Leaving a room
  socket.on("disconnect", () => {
    console.log("user has left");
  });

  /**
   * ----------------------------
   * Chat Sockets
   * ----------------------------
   */
  socket.on("message", (msg) => {
    console.log("message received" + msg);
    io.emit('message', {type: 'new-message', text: msg});
  });


  /**
   * -----------------------------
   * Video Queue Sockets
   * -----------------------------
   */

   /**
    * Allows the users to see the added video in
    * the video queue
    * @emits the video that been added
    */
  socket.on("addVideo", (video)=>{
    console.log("adding video to the playlist");
    io.emit("addVideo", video);
  });

  /**
   * Removes a certain video from the playlist
   * @emits the playlist with the video removed
   */
  socket.on("removeVideo", (playlist)=>{
    console.log('removing a video');
    io.emit("removeVideo", playlist);
  });

  /**
   * ------------------------------
   * Video Player Sockets
   * ------------------------------
   */
  socket.on("videoState", (isPlaying)=>{
    console.log('is video playing? ' + isPlaying);
    io.emit('videoState',isPlaying);
  });

  socket.on("nextVideo",(video)=>{
    console.log("next video code: " + video);
    io.emit('nextVideo', video);
  });

  socket.on("currentDuration", (time)=>{
    console.log("current time: " + time);
    io.emit('currentDuration', time);
  });

  socket.on("seekTo", (seekValue)=>{
    console.log("Seeking To: " + seekValue);
    io.emit("seekTo", seekValue);
  })

  socket.on("videoLoading", (loading)=>{
    console.log("is the video loading? " + loading);
    io.emit('videoLoading', loading);
  });

});


http.listen(4444, ()=>{
  console.log("opening connection");
});

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
