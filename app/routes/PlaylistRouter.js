const express = require('express');
const router = express.Router();

const PlaylistController = require('../controllers/PlaylistController');

router.get('/', PlaylistController.getAllPlaylists);
// db call
router.get('/byPosition', PlaylistController.getPlaylistByPosition);
//db call
router.post('/', PlaylistController.createPlaylist);
//db call
router.delete('/', PlaylistController.deletePlaylist);
//db call

module.exports = router;
