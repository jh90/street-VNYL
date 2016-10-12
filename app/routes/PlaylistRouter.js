const express = require('express');
const router = express.Router();

const PlaylistController = require('PlaylistController');

router.get('/playlists', PlaylistController.getAllPlaylists);
// db call
router.get('/playlists/byPosition', PlaylistController.getPlaylistByPosition);
//db call
router.post('/playlists', PlaylistController.createPlaylist);
//db call
router.delete('/playlists', PlaylistController.deletePlaylist);
//db call

module.exports = router;
