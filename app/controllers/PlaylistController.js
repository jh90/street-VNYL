const PlaylistDAO = require('../services/playlistDAO');

class PlaylistController {
  static getAllPlaylists (req, res) {
    console.log('controller hit');
    PlaylistDAO.getAll().then((playlists) => {
      console.log('response from DAO');
      console.log(playlists);
      res.status(200).json(playlists);
    });
  }

  static getPlaylistByPosition (req, res) {
    const { lat, lng } = req.body;
    PlaylistDAO.findByCoordinates({ lat, lng })
               .then((playlist) => {
                  res.status(200).send(playlist);
    });
  }
  //playlist pos get arg

  static createPlaylist (req, res) {
    const { uid, title, lat, lng } = req.body;
    PlaylistDAO.create({ uid, title, lat, lng })
               .then((playlist) => {
                  res.status(200).send(playlist);
               });
  }
  //playlist title, pos send arg

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
