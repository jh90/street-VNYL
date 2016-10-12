const trackDAO = require('../services/trackDAO.js');

class TrackController {
  static searchTrackByTitle (req, res) {
    console.log(req.body);
    trackDAO.searchByTitle(req.body.title)
            .then((tracks) => {
               res.status(200).json(tracks);
    });
  }
  //track title get arg

  static getTracksByPlaylistID (req, res) {
    trackDAO.findByID(req.params.id)
            .then((tracks) => {
              console.log(tracks);
              res.status(200).json(tracks);
    });
  }
  //playlist id param

  static saveTrack (req, res) {
    const { title, artist, preview, playlistID } = req.body;
    trackDAO.create({ title, artist, preview, playlistID })
            .then(() => {
              res.status(200);
    });
  }
  //track obj post arg

  static deleteTrack (req, res) {
    console.log(req.body);
    trackDAO.delete(req.body.id)
            .then(() => {
              res.status(200);
    });
  }
  //track id del arg
}

module.exports = TrackController;
