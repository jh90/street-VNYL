import React from 'react';
import request from 'superagent';
import { Link } from 'react-router';
import { GoogleMap, GoogleMapLoader, Marker, SearchBox } from 'react-google-maps';
import Modal from 'react-modal';
import SpotifyTest from './SpotifyTest.jsx';
import NavBar from './NavBar.jsx';

const propTypes = {
  children: React.PropTypes.element,
};

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      positionData: [],
      currentLocation: {lat: 40.78, lng: -73.96},
      zoom: 12,
      playlistModalOpen: false,
    };
    this.createNewPlaylist = this.createNewPlaylist.bind(this);
    this.dropMarker = this.dropMarker.bind(this);
    this.openPlaylistModal = this.openPlaylistModal.bind(this);
    this.closePlaylistModal = this.closePlaylistModal.bind(this);
    this.afterOpenPlaylistModal = this.afterOpenPlaylistModal.bind(this);
  }

  componentDidMount () {
    this.getAllPlaylists();
  }

  getAllPlaylists () {
    request.get('/api/playlists')
           .then((response) => {
              const playlistArray = response.body;
              const playlistLocations = playlistArray.map((playlist) => {
                const playlistLat = playlist.lat;
                const playlistLng = playlist.lng;
                const playlistTitle = playlist.title;
                return {lat: playlistLat, lng: playlistLng, title: playlistTitle};
              });
              this.setState({
                positionData: playlistLocations,
              });
           });
  }

  dropMarker() {
    navigator.geolocation.getCurrentPosition((pos) => {
      const currentLng = pos.coords.longitude;
      const currentLat = pos.coords.latitude;
      const newMarker = {
        uid: 1,
        title: 'New Playlist',
        lat: currentLat,
        lng: currentLng
      }
      //LATER: use PATCH to update all playlist titles on user input
      this.setState({
        currentLocation: {lat: currentLat, lng: currentLng},
        zoom: 16,
      });
      const playlistID = this.createNewPlaylist(newMarker);
      return playlistID;
    });
   }

  createNewPlaylist (marker) {
    request.post('/api/playlists')
           .send(marker)
           .then((response) => {
              this.getAllPlaylists();
              return response.body.id;
           });
  }

  openPlaylistModal() {
    this.setState({ playlistModalOpen: true });
  }

  afterOpenPlaylistModal() {
    this.refs.subtitle.style.color = '#f00';
  }

  closePlaylistModal() {
    this.setState({ playlistModalOpen: false });
  }

  render() {
    return (
      <div id="container">
        <div>
          <NavBar handleNewMarker={this.dropMarker} openPlaylistModal={this.openPlaylistModal}/>
          {this.props.children}
        </div>
        <Modal
          className="playlistModal"
          isOpen={this.state.playlistModalOpen}
          onAfterOpen={this.afterOpenPlaylistModal}
          onRequestClose={this.closePlaylistModal}
        >
          <button id="closePlaylist" onClick={this.closePlaylistModal}>X</button>
          <SpotifyTest />


        </Modal>
        <div className="map">
          <GoogleMapLoader
            containerElement={
              <div
                {...this.props}
                style={{
                  height: '100%',
                }}
              />
            }
            googleMapElement={
              <GoogleMap
                containerProps={{
                  style: {
                    height: '100%',
                  },
                }}
                defaultZoom={this.state.zoom}
                defaultCenter={this.state.currentLocation}
              >
                {
                  this.state.positionData.map((coordinates) => {
                    return (
                      <Marker
                        position={{
                          lat: coordinates.lat,
                          lng: coordinates.lng,
                        }}
                        onClick={this.openPlaylistModal}
                      />
                    );
                  })
                }
              </GoogleMap>
            }
          />
        </div>
      </div>
    );
  }
}

App.propTypes = propTypes;

// {
//                   this.state.data.map((place, idx) => {
//                     console.log(place.long);
//                     return (
//                       <Marker
//                         position={{
//                           lat: place.lat,
//                           lng: place.long,
//                         }}
//                       />
//                     );
//                   })
//                 }
