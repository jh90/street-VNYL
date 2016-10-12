const db = require('../config/sql/db.js');
const sql = require('../config/sql/sqlProvider.js');
const Playlist = require('../models/Playlist.js');

class playlistDAO {
  static getAll () {
    return db.all(sql.all, [], (row) => new Playlist(row));
  }

  static findByCoordinates ({ lat, lng }) {
    return db.one(sql.find, [lat, lng], (playlist) => new Playlist(playlist));
  }

  static create (data) {
    const { title, uid, lat, lng } = data;
    return db.one(sql.create, [title, uid, lat, lng], (playlist) => new Playlist(playlist));
  }

  static deleteByCoordinates (coordinates) {
    const { lat, lng } = coordinates;
    return db.none(sql.delete, [lat, lng]);
  }
}

module.exports = playlistDAO;
