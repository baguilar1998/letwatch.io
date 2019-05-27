const express = require('express');
const router = express.Router();
const UserController = require('../controller/users');

//Retrieve all users
router.get('/users',UserController.retrieveAllUsers);

//Retrieve a specific user
router.get('/user/:id', UserController.findUserById);

//Creates a new user given the nicknaame and avatar colors
router.post("/user",UserController.addUser);

//Removes a user from the database
router.post("/removeUser", UserController.removeUser);

//Update your nickname by id
//If new is true, you get the new modified user back
//If false, you get the old user back
router.put("/user/:id", UserController.updateNickname);

module.exports = router;
