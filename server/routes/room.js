const express = require('express');
const router = express.Router();
const randomCode = require('random-key');
const Room = require('../models/Room');


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
  console.log(req.body);
  let newRoom = new Room();

  //let { name, host, invitationCode, password, maxCapacity, createdAt} = req.body;

  newRoom.name = req.body.roomName;
  newRoom.host = req.body.host;
  newRoom.users = req.body.currentUsers;
  newRoom.invitationCode = invitationCode;
  newRoom.password = req.body.password;
  newRoom.maxCapacity = req.body.maxCapacity;

  console.log(newRoom);
  newRoom.save((err, createdRoom) => {
    if(err){
      res.send("Error Creating Room");
    } else {
      res.send(createdRoom);
      console.log("Succesfully Created Room");
      // res.redirect(`/room/${createdRoom.invitationCode}`);
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
