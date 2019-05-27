const express = require('express');
const router = express.Router();
const PlaylistController = require('../controller/playlist');

/**
 * Adds a video to the playlist
 */
router.post('/addVideo', PlaylistController.addVideo);
/**
 * Retrieves playlist data from a room
 */
router.get('/getVideos/:roomId', PlaylistController.getPlaylist);

/**
 * Removes a video from the playlist in the DB
 *
 *
 * ----WORK NEEDED-----
 * Currently working by a manual id, requires a playlist ID to change
 *
 */
router.put('/removeVideo', PlaylistController.removeVideo);


module.exports = router;
