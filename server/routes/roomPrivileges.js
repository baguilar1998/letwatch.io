const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/User');
const Room = require('../models/Room');



router.put("/remove-user/:id", (req, res) => {

    console.log("Removing User");
    let roomId = req.body.id;
    let userToRemove = User.find(req.body.userId.exec((err, user) => {
        if(err){ return "User Not Found";} 
        else { return user;}
    });

    //Room to update
    //Object that contains update
    //Returns the newly updated object
    //Callback
    Room.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, room) => {

        if(err) {
            return res.status(500).send(err);
        } else {
            return res.send(room);
        }
    })
})