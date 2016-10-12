const request = require('superagent');

const db = require('../config/sql/db.js');
const sql = require('../config/sql/sqlProvider.js');
const Track = require('../models/Track.js');

class trackDAO {
  static searchByTitle (title) {
    const trackList = [];
    const baseURL = `https://api.spotify.com/v1/search?q=${title}&type=track&limit=25`;
    return request.get(baseURL).then((response) => {
      const returnedTracks = response.body.tracks.items;
      returnedTracks.forEach((track) => {
        const cleanTrack = this.cleanTrackData(track);
        trackList.push(cleanTrack);
      });
      return new Track(cleanTrack);
    });
  }

  static findByID (id) {

  }

  static create (data) {

  }
}
