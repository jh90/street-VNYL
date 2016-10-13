const express = require('express');
const TrackController = require('../controllers/TrackController.js');

const router = express.Router();

router.get('/search', TrackController.searchTracksByInput);
// api call
// CONNECTED
router.get('/byPlaylist/:id', TrackController.getTracksByPlaylistID);
// db call
//CONNECTED
router.post('/', TrackController.saveTrack);
// db call
// CONNECTED
router.delete('/:id', TrackController.deleteTrack);
// db call

module.exports = router;
