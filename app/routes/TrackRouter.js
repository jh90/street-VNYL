const express = require('express');
const TrackController = require('../controllers/TrackController.js');

const router = express.Router();

router.get('/tracks/search', TrackController.searchTracksByTitle);
// api call
// CONNECTED
router.get('/tracks/byPlaylist/:id', TrackController.getTracksByPlaylistID);
// db call
router.post('/tracks', TrackController.saveTrack);
// db call
router.delete('/tracks/:id', TrackController.deleteTrack);
// db call

module.exports = router;
