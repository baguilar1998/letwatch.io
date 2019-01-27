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
          res.status(200).send(room);
        }
    });
});

/**
 * Gets all the current users that are in the room
 */
router.post("/currentUsers", (req,res,next)=>{
 /* Room.findOne({"invitationCode":req.body.invitationCode}).then(usersArr=>{
    // If room doesn't exist, return an error
    if(!usersArr){
      res.status(400).json({message:"Room was not found"});
    }

    /**
     * Querying each user that we got in the room and storing
     * the actual user data in an array

    const currentUsers = [];
    for(i=0 ; i < usersArr.users.length ; i+=1){
      const currentId = usersArr.users[i];
      User.findById(currentId).then(res=>{
        currentUsers.push(res);
      }).catch(err=>{
        console.log('could not retrieve user');
      });
    }

    console.log(currentUsers);

    /**
     * Returns all user ids that are in
     * the current room

    res.status(200).json({
      usersArray: currentUsers
    });


  }).catch(err=>{
    console.log(err);
    res.status(201).json({
      message:"Room was not found"
    });
  });*/
  Room.findOne({"invitationCode":req.body.invitationCode}).then(function(users){
    var currentUsers = [];
    console.log(users);
    users.users.forEach(function(cu){
      currentUsers.push(User.findById(cu))
    });
    return Promise.all(currentUsers);
  }).then(function(allUsers){
    console.log(allUsers);
    res.send(allUsers);
  }).catch(err=>{
    res.send(err);
  })
});


module.exports = router;
