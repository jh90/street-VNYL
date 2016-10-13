const trackDAO = require('../services/trackDAO.js');

class TrackController {
  static searchTracksByTitle (req, res) {
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
    console.log('controller hit');
    console.log(req.body);
    const { playlistID, title, artist, previewURL } = req.body;
    trackDAO.create({ playlistID, title, artist, previewURL })
            .then((track) => {
              console.log('DAO responded');
              console.log(track);
              res.status(200).json(track);
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
