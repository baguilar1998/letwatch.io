const express = require('express');
const router = express.Router();
const RoomController = require('../controller/room');

//Generates an invitation key for a new room
router.get('/invitation', RoomController.createInvitationKey);

/*
Creates room and redirects user to the assigned room
Using the invitation code as the url params
*/
router.post('/create', RoomController.createRoom);


/*
  Sends user to the room based off the invitation code
*/
router.get("/:invitationCode", RoomController.joinRoom);

/**
 * Pushes the user to a room that they joined
 */
router.post("/pushToRoom", RoomController.addUserToRoom);

/**
 * Removes a user from the room
 */
router.post("/leaveRoom", RoomController.leaveRoom);

/**
 * Gets all the current users that are in the room
 */
router.post("/currentUsers", RoomController.usersInRoom);

module.exports = router;
