const express = require('express');
const router = express.Router();
const randomCode = require('random-key');
const Room = require('../models/Room');
const User = require('../models/User');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

router.get('/invitation', (req,res,next)=>{
  // Generates a random key
  const code = randomCode.generate();

  /**
   * Sends an error message if no code
   * was generated
   */
  if(code == null) {
    res.status(400).json({
      message: "Code was not generated"
    });
  }

  /**
   * If the key was generated. The results will
   * be sent in a json format
   */
  res.status(200).json({
    invitation: code,
    message: 'Generated Invitation Code'
  });
});

/*
Creates room and redirects user to the assigned room
Using the invitation code as the url params
*/

router.post('/create', (req,res, next) => {

  console.log("Creating Room");

  let newRoom = new Room({
    name : req.body.roomName,
    host : req.body.host,
    users : req.body.currentUsers,
    invitationCode : req.body.invitationCode,
    password : req.body.password,
    maxCapacity : req.body.maxCapacity
  });

  newRoom.users.push(newRoom.host);

  newRoom.save((err, createdRoom) => {
    if(err){
      console.log("Room was not created");
      res.send("Error Creating Room");
    } else {
      console.log("Succesfully Created Room");
      res.send(createdRoom);
    }
  });
});


/*
  Sends user to the room based off the invitation code
*/
router.get("/:invitationCode", (req, res) => {
    Room.findOne({
      "invitationCode": req.params.invitationCode
    }).then(room=>{
        if(!room){
          console.log("room was not found");
          res.send("Error room was not found");
        }else {
          console.log(room);
          // IMPLEMENT CODE TO PUSH THE USER TO THE ROOM
          res.status(200).send(room);
        }
    });
});

/**
 * Gets all the current users that are in the room
 */
router.post("/currentUsers", (req,res,next)=>{
  Room.findOne({"invitationCode":req.body.invitationCode}).then(results=>{
    // A list to store all the users that are in the room
    var currentUsers = [];

    //Go through the current users and find them in the database
    results.users.forEach(function(cu){
      currentUsers.push(User.findById(cu))
    });

    // Returing a promise because multiple async tasks are being performed
    return Promise.all(currentUsers);

  }).then(allUsers=>{
    res.send(allUsers);
  }).catch(err=>{
    res.send(err);
  });

});


module.exports = router;
