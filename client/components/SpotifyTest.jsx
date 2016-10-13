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

  getTracks () {
    const searchInput = this.state.keyword;
    const trackList = [];
    request.get('api/tracks/search').then((response) => {
      console.log(response);
      response.forEach((track) => {
        trackList.push(track);
      });
      this.setState({
        tracks: trackList,
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
          <input id='searchButton' type='submit'
                 onClick={this.handleSubmit}
                 value='Search'
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
