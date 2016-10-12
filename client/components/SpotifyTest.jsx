import React from 'react';
import request from 'superagent';

import TrackListElement from './TrackListElement.jsx';

export default class SpotifyTest extends React.Component {
  constructor () {
    super();
    this.state = {
      keyword: '',
      tracks: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getTracks = this.getTracks.bind(this);
  }

  cleanTrackData (data) {
    const cleanTrackObject = {
      title: data.name,
      artist: data.artists[0].name,
      previewURL: data.preview_url,
    };
    return cleanTrackObject;
  }

  getTracks () {
    const searchInput = this.state.keyword;
    const trackList = this.state.tracks;
    const baseURL = `https://api.spotify.com/v1/search?q=${searchInput}&type=track&limit=10`;
    request.get(baseURL).then((response) => {
      const returnedTracks = response.body.tracks.items;
      returnedTracks.forEach((track) => {
        const cleanTrack = this.cleanTrackData(track);
        trackList.push(cleanTrack);
        this.setState({
          tracks: trackList,
        });
      });
    });
  }

  handleChange (e) {
    e.preventDefault();
    const target = e.target;
    this.setState({
      keyword: target.value,
    });
  }

  handleSubmit (e) {
    e.preventDefault();
    this.getTracks();
  }

  render () {
    return (
      <div>
        <form id='search-form' onSubmit={this.handleSubmit}>
          <input type='text'
                 name='keyword'
                 placeholder='track'
                 value={this.state.keyword}
                 onChange={this.handleChange} />
          <input type='submit'
                 onClick={this.handleSubmit}
                 value='search'
              />
        </form>
        <ul id="song-list">
        {this.state.tracks.map((track) => {
          return (
            <TrackListElement trackData={track} />
          );
        })}
        </ul>
      </div>
    );
  }
}
