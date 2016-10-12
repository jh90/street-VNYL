const request = require('superagent');

const db = require('../config/sql/db.js');
const sql = require('../config/sql/sqlProvider.js').tracks;
const Track = require('../models/Track.js');

class trackDAO {
  static cleanTrackData (data) {
    const cleanTrackObject = {
      title: data.name,
      artist: data.artists[0].name,
      previewURL: data.preview_url,
    };
    return cleanTrackObject;
  }

  static searchBy (input) {
    const trackList = [];
    const baseURL = `https://api.spotify.com/v1/search?q=${input}&type=track&limit=25`;
    return request.get(baseURL).then((response) => {
      const returnedTracks = response.body.tracks.items;
      returnedTracks.forEach((track) => {
        const cleanTrack = this.cleanTrackData(track);
        trackList.push(cleanTrack);
      });
      return new Track(cleanTrack);
    });
  }

  static findByPlaylistID (id) {
    const key = Object.keys(id)[0];
    const value = id[key];
    return db.map(sql.find, [key, value], (track) => new Track);
  }

  static create ({ title, artist, preview, playlistID }) {
    return db.one(sql.create, [title, artist, preview, playlistID])
             .then((track) => new Track(track));
  }

  static delete (id) {
    return db.none(sql.delete, [id]);
  }
}

module.exports = trackDAO;
