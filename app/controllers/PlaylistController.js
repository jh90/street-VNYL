const PlaylistDAO = require('../services/playlistDAO');

class PlaylistController {
  static getPlaylistByPosition (req, res) {
    const { lat, lng } = req.body;
    playlistDAO.findByCoordinates({ lat, lng })
               .then((playlist) => {
                  res.status(200).send(playlist);
    });
  }
  //playlist pos get arg

  static createPlaylist (req, res) {
    const { title, lat, lng } = req.body;
    playlistDAO.create({ title, lat, lng })
               .then(() => {
                  res.status(200);
    });
  }
  //playlist title, pos send arg

  static deletePlaylist (req, res) {
    const { lat, lng } = req.body;
    playlistDAO.deleteByCoordinates({ lat, lng })
               .then(() => {
                  res.status(200);
    });
  }
  //playlist pos del arg
}

module.exports = PlaylistController;
