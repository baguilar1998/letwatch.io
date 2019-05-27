const mongoose = require('mongoose');
const Room = require('../models/Room');
const Video = require('../models/Video');
const Playlist = require('../models/Playlist');

exports.addVideo = (req,res,next) => {
   // Create a new video object
   let video = req.body.video;

   Playlist.findOne({"roomId":req.body.roomId}, (err, playlist) => {
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
         res.send(newPlaylist);
       }).catch(err=>{
         console.log(err);
         res.send("Error in creating playlist");
       });
     }else {
       //Updates the current playlist
       Playlist.updateOne({"roomId": playlist.roomId},{$push:{videos:video}}).then(results=>{
         res.send(results);
       }).catch(err=>{
         res.send("Error in updated the playlist")
       });
     }

   });
}

exports.getPlaylist = (req,res,next) => {
  Playlist.findOne({"roomId":req.params.roomId}).then(playlist=>{
    let tempPlaylist;
    if(!playlist){
      tempPlaylist = [];
    }else{
      tempPlaylist = playlist;
    }
    res.status(201).send({
      currentPlaylist:tempPlaylist.videos
    });
  }).catch(err=>{
    console.log("An error occured gathering all the videos");
    console.log(err);
  });
}

exports.removeVideo = (req,res,next) => {
  const roomId = req.body.roomId;
  const vidToRemove = req.body.video;


  Playlist.findOne({roomId: roomId}, (err, playlist) => {
    console.log(playlist);
    if(playlist.length === 0){
      res.send({
        booleanValue:false,
        currentPlaylist:[]
      });
    } else {

      const videos = playlist.videos.filter((vid) => vid.videoId != vidToRemove.videoId);


  Playlist.findByIdAndUpdate(playlist._id,{
        $set: {
        videos: videos,
        returnNewDocument: true
      }
    }).then((updatedList) => {
        res.send(updatedList);
      }).catch((err) => {
        res.send("Error updating the playlist")
      });
    }
  }).catch(err=>{
      res.send("Error occured finding the playlist");
    });
}
