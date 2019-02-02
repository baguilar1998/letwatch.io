const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Room = require('../models/Room');
const Video = require('../models/Video');
const Playlist = require('../models/Playlist');

router.post('/addVideo', (req,res,next)=>{

  console.log(req.body);

  // Create a new video object
  let video = {
    name: req.body.video.title,
    description: req.body.video.description,
    creator: req.body.video.creator,
    imageUrl: req.body.video.imageUrl
  };


  Playlist.findOne({"roomId":req.body.roomId}).then(playlist =>{
    /**
     * Creates a new playlist and adds tge first video
     * into the playlist if one exist.
     * If it doesn't exist, then add the new
     * video to the current playlist
     */
    if(!playlist){
      // Creates a new playlist
      const newPlaylist = new Playlist({
        roomId: req.body.roomId,
        videos:[video]
      });
      // Adds the new playlist to the database
      newPlaylist.save().then(results=>{
        console.log("video added");
        res.status(201).send(newPlaylist);
      }).catch(err=>{
        console.log(err);
        res.status(500).send("Error in creating playlist");
      });
    }else {
      //Updates the current playlist
      Playlist.updateOne({"roomId": playlist.roomId},{$push:{videos:video}}).then(results=>{
        res.status(201).send(results);
      }).catch(err=>{
        res.status(400).send("Error in updated the playlist")
      });
    }

  });
});

router.post('/getVideos', (req,res,next)=>{
  Playlist.findOne({"roomId":req.body.roomId}).then(playlist=>{
    if(!playlist){
      //Don't send anything back but its not an error
    }
    res.status(201).send(playlist);
  }).catch(err=>{
    console.log("An error occured gathering all the videos");
    console.log(err);
    res.status(400).send("Error has occured");
  });
});


module.exports = router;
