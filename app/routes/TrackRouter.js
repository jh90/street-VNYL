const express = require('express');
const TrackController = require('../controllers/TrackController.js');

const router = express.Router();

router.get('/search', TrackController.searchTracksByTitle);
// api call
// CONNECTED
router.get('/byPlaylist/:id', TrackController.getTracksByPlaylistID);
// db call

router.post('/', TrackController.saveTrack);
// db call
// CONNECTED
router.delete('/:id', TrackController.deleteTrack);
// db call

module.exports = router;
