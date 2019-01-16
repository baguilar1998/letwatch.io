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

    let newUser = new User();
    newUser.nickName = req.body.nickName;
    newUser.avatarColor = req.body.avatarColor;

    newUser.save((err, addedUser) => {
        if(err){
            res.send("Error saving user");
        } else {
            res.send(addedUser);
            res.redirect('/');
        }
    });
});


//Update your nickname by id
//If new is true, you get the new modified user back
//If false, you get the old user back
router.put("/user/:id", (req,res) => {
    
    User.findByIdAndUpdate(req.params.id, {
        $set: {
            nickName: req.body.nickName,
            avatarColor: req.body.avatarColor
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