const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/User');


//Retrieve all users
router.get('/users', (req, res) => {

    User.find({})
    .exec(function(err, users){
        if(err){
            console.log("Error retrieving users");
        } else {
            res.send(users);
        }
    })
});


//Retrieve a specific user
router.get('/user/:id', (req, res) => {

    User.findById(req.params.id)
    .exec((err, user) => {
        if(err){
            res.send("Error retrieving user");
        } else {
            res.send(user);
        }
    });
});

//Creates a new user given the nicknaame and avatar colors
router.post("/user", (req, res) => {

    console.log("Creating new user");

    /**
     * Storing the posted data in a User
     * model
     */
    let newUser = new User();
    newUser.nickname = req.body.nickname;
    newUser.iconName = req.body.iconName;

    // Storing user into the database
    newUser.save((err, addedUser) => {
        if(err){
            res.send("Error saving user");
        } else {
            res.send(addedUser);
            // res.redirect('/');
        }
    });
});

/**
 * Removes a user from the database
 */
router.post("/removeUser", (req,res,next)=>{
  User.remove({"_id": req.body.id}).then(success=>{
    console.log("User left and has been removed");
    res.status(200).send(success);
  }).catch(err=>{
    console.log("There was an error in removing a user");
  })
});

//Update your nickname by id
//If new is true, you get the new modified user back
//If false, you get the old user back
router.put("/user/:id", (req,res) => {

    User.findByIdAndUpdate(req.params.id, {
        $set: {
            nickName: req.body.nickName,
            iconName: req.body.iconName
        }
    },{new: true},
        (err, updatedUser) => {
            if(err) {
                res.send("Error updating user");
            } else {
                res.send(updatedUser);
            }
        });

});



module.exports = router;
