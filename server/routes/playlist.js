const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Room = require('../models/Room');
const Video = require('../models/Video');

router.post('/addVideo', (req,res,next)=>{
  // Create a new video object
  let video = new Video({
    name: req.body.video.title,
    description: req.body.video.description,
    creator: req.body.video.creator,
    imageUrl: req.body.video.imageUrl
  });

  let currentPlaylist;

  /*Playlist.findOne({roomId:req.body.roomId}).then(playlist =>{

    if(!playlist){
      //ADD A NEW PLAYLIST TO THE DATABASE
    }
    currentPlaylist = playlist.videos;
    currentPlaylist.push(video);
    //UPDATE THE PLAYLIST IN THE DATABASE
  });*/
});

router.post('/getVideos', (req,res,next)=>{
  let playlist = [];
});


module.exports = router;
