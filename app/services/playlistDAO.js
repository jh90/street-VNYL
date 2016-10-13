const db = require('../config/sql/db.js');
const sql = require('../config/sql/sqlProvider.js').playlists;
const Playlist = require('../models/Playlist.js');

class playlistDAO {
  static getAll () {
    return db.map(sql.all, [], (row) => new Playlist(row));
  }

  static findByCoordinates (data) {
    const { cleanLat, cleanLng } = data;
    return db.one(sql.find, [cleanLat, cleanLng], (playlist) => new Playlist(playlist));
  }

  static create (data) {
    const { uid, title, lat, lng } = data;
    return db.one(sql.create, [uid, title, lat, lng]);
  }

  static deleteByCoordinates (coordinates) {
    const { lat, lng } = coordinates;
    return db.none(sql.delete, [lat, lng]);
  }
}

module.exports = playlistDAO;
