const PlaylistDAO = require('../services/playlistDAO');

class PlaylistController {
  static getAllPlaylists (req, res) {
    PlaylistDAO.getAll().then((playlists) => {
      res.status(200).json(playlists);
    });
  }

  static getPlaylistByPosition (req, res) {
    const { lat, lng } = req.query;
    const cleanLat = Number(lat);
    const cleanLng = Number(lng);
    PlaylistDAO.findByCoordinates({ cleanLat, cleanLng })
               .then((playlist) => {
                  res.status(200).json(playlist);
    });
  }
  //playlist pos get arg

  static createPlaylist (req, res) {
    const { uid, title, lat, lng } = req.body;
    PlaylistDAO.create({ uid, title, lat, lng })
               .then((playlist) => {
                  res.status(200).json(playlist);
               });
  }
  //playlist currentuid, title, pos send arg

  static deletePlaylist (req, res) {
    const { lat, lng } = req.body;
    PlaylistDAO.deleteByCoordinates({ lat, lng })
               .then(() => {
                  res.status(200);
    });
  }
  //playlist pos del arg
}

module.exports = PlaylistController;
