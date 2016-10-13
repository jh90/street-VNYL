const request = require('superagent');

const db = require('../config/sql/db.js');
const sql = require('../config/sql/sqlProvider.js').tracks;
const Track = require('../models/Track.js');

class trackDAO {
  static searchBy (input) {
    const trackList = [];
    const cleanInput = input.replace(' ', '%20');
    console.log(cleanInput);
    const baseURL = `https://api.spotify.com/v1/search?q=${cleanInput}&type=track&limit=25`;
    return request.get(baseURL).then((response) => {
      console.log('response from API');
      const trackData = response.body.tracks.items;
      console.log(trackData);
      const cleanTrackData = trackData.map((track) => {
        const cleanTrack = {
          title: track.name,
          artist: track.artists[0].name,
          previewURL: track.preview_url,
        };
        console.log(cleanTrack);
        return cleanTrack;
      });
      console.log(cleanTrackData);
      return cleanTrackData;
    });
  }

  static findByPlaylistID (id) {
    const key = Object.keys(id)[0];
    const value = id[key];
    return db.map(sql.find, [key, value], (track) => new Track);
  }

  static create (data) {
    console.log('DAO hit');
    const { playlistID, title, artist, previewURL } = data;
    console.log(previewURL);
    console.log(playlistID);
    console.log(artist);
    console.log(title);
    return db.one(sql.create, [playlistID, title, artist, previewURL]);
  }

  static delete (id) {
    return db.none(sql.delete, [id]);
  }
}

module.exports = trackDAO;
