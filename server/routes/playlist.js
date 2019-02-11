const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Room = require('../models/Room');
const Video = require('../models/Video');
const Playlist = require('../models/Playlist');

/**
 * Adds a video to the playlist
 */
router.post('/addVideo', (req,res,next)=>{
  // Create a new video object
  let video = req.body.video;


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

/**
 * Retrieves playlist data from a room
 */
router.get('/getVideos/:roomId', (req,res,next)=>{
  Playlist.findOne({"roomId":req.params.roomId}).then(playlist=>{
    if(!playlist){
      res.send({
        booleanValue:false,
        currentPlaylist:[]
      });
    }
    res.send({
      booleanValue:true,
      currentPlaylist:playlist
    });
  }).catch(err=>{
    console.log("An error occured gathering all the videos");
    console.log(err);
  });
});


/**
 * Removes a video from the playlist in the DB
 * 
 * 
 * ----WORK NEEDED-----
 * Currently working by a manual id, requires a playlist ID to change
 * 
 */
router.put('/removeVideo', (req,res)=>{
  const roomId = req.body.roomId;
  const vidToRemove = req.body.video;


  Playlist.find({roomId: roomId}).then(playlist=>{
    if(!playlist){
      res.send({
        booleanValue:false,
        currentPlaylist:[]
      });
    }
    const videos = playlist.videos.filter((video) => video.videoId != vidToRemove.videoId);

    Playlist.findByIdAndUpdate(
      {_id: playlist._id},
      {videos: [videos]},
      {returnNewDocument: true}
    ).then((updatedList) => {

      console.log(updatedList);
      // res.send(updatedList);



    }).catch((err) => {
      res.send("Error updating the playlist")
    });
  }).catch(err=>{
    res.send("Error occured finding the playlist");
  });
});

module.exports = router;
