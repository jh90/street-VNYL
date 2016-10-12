const express = require('express');
const router = express.Router();

const PlaylistController = require('../controllers/PlaylistController');

router.get('/', PlaylistController.getAllPlaylists);
// db call
// CONNECTED
router.get('/byPosition', PlaylistController.getPlaylistByPosition);
//db call
router.post('/', PlaylistController.createPlaylist);
//db call
// CONNECTED
router.delete('/', PlaylistController.deletePlaylist);
//db call

module.exports = router;
