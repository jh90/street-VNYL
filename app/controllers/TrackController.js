const trackDAO = require('../services/trackDAO.js');

class TrackController {
  static searchTracksByInput (req, res) {
    const { input } = req.query;
    trackDAO.searchBy(input)
            .then((tracks) => {
               res.status(200).json(tracks);
    });
  }
  //track title get arg

  static getTracksByPlaylistID (req, res) {
    trackDAO.findByID(req.params.id)
            .then((tracks) => {
              res.status(200).json(tracks);
    });
  }
  //playlist id param


  static saveTrack (req, res) {
    const { playlistID, title, artist, previewURL } = req.body;
    trackDAO.create({ playlistID, title, artist, previewURL })
            .then((track) => {
              res.status(200).json(track);
            });
  }
  //track obj post arg

  static deleteTrack (req, res) {
    trackDAO.delete(req.body.id)
            .then(() => {
              res.status(200);
    });
  }
  //track id del arg
}

module.exports = TrackController;
