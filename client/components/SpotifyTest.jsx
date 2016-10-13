import React from 'react';
import request from 'superagent';
import Modal from 'react-modal';
import TrackListElement from './TrackListElement.jsx';

const propTypes = {
  openSearchModal: React.PropTypes.func,
  closeSearchModal: React.PropTypes.func,
  afterOpenSearchModal: React.PropTypes.func,
};

export default class SpotifyTest extends React.Component {
  constructor () {
    super();
    this.state = {
      keyword: '',
      tracks: [],
      searchModalOpen: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getTracks = this.getTracks.bind(this);
    this.openSearchModal = this.openSearchModal.bind(this);
    this.closeSearchModal = this.closeSearchModal.bind(this);
    this.afterOpenSearchModal = this.afterOpenSearchModal.bind(this);
  }

  cleanTrackData(data) {
    const cleanTrackObject = {
      title: data.name,
      artist: data.artists[0].name,
      previewURL: data.preview_url,
    };
    return cleanTrackObject;
  }

  getTracks () {
    const searchInput = this.state.keyword;
    const cleanSearchInput = searchInput.replace(' ', '%20');
    console.log(cleanSearchInput);
    const trackList = [];
    request.get(`api/tracks/search?input=${cleanSearchInput}`).then((response) => {
      response.body.forEach((track) => {
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
    this.openSearchModal();
  }

  openSearchModal() {
    this.setState({ searchModalOpen: true });
  }

  afterOpenSearchModal() {
    this.refs.subtitle.style.color = '#f00';
  }

  closeSearchModal() {
    this.setState({ searchModalOpen: false });
  }
  render () {
    return (
      <div>
        <form id="search-form" onSubmit={this.handleSubmit}>
          <input
            id="searchText"
            type="text"
            name="keyword"
            placeholder="track"
            value={this.state.keyword}
            onChange={this.handleChange}
          />
          <input
            id="searchButton"
            type="submit"
            onClick={this.handleSubmit}
            value="Search"
          />
        </form>
        <Modal
          className="search-modal"
          isOpen={this.state.searchModalOpen}
          onAfterOpen={this.afterOpenSearchModal}
          onRequestClose={this.closeSearchModal}
        >
          <ul id="song-list">
            {this.state.tracks.map((track) => {
              return (
                <TrackListElement trackData={track} />
              );
            })}
          </ul>
        </Modal>
      </div>
    );
  }
}

SpotifyTest.propTypes = propTypes;
