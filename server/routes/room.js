const express = require('express');
const router = express.Router();
const randomCode = require('random-key');
const Room = require('../models/Room');
const User = require('../models/User');


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
    Room.find({
      "invitationCode": req.params.invitationCode
    }, (err, room) => {
      if(err) {
        res.send("Error, Room does not exist");
      } else {
        res.send(room);
        console.log("Successfully joined room");
        // res.redirect(`/room/${room.invitationCode}`);
      }
    });
});


module.exports = router;
