import React from 'react';
import request from 'superagent';

export default class CreatePlaylistForm extends React.Component {
  constructor () {
    super();
    this.state = {
      doesthisshitwork: false,
      playlists: [],
    };
    this.makeNewPlaylist = this.makeNewPlaylist.bind(this);
    this.getAllPlaylists = this.getAllPlaylists.bind(this);
    this.saveTrack = this.saveTrack.bind(this);
  }

  componentDidMount () {
    this.saveTrack();
  }

  makeNewPlaylist () {
    console.log('method initiates');
    const playlistDetails = {uid: 1, title: 'Test Drive', lat: 5.4, lng: 4.3};
    request.post('/api/playlists')
           .send(playlistDetails)
           .then((response) => {
              console.log('got response');
              console.log(response);
              this.setState({
                doesthisshitwork: true,
              });
           });
  }

  getAllPlaylists () {
    console.log('method initiates');
    request.get('/api/playlists')
           .then((response) => {
              console.log('got response');
              console.log(response);
              this.setState({
                doesthisshitwork: true,
              });
           });
  }

  getPlaylistByPosition () {
    console.log('method initiates');
    request.get('api/playlists/byPosition?lat=1&lng=-1')
           .then((response) => {
              console.log('got response');
              console.log(response);
              this.setState({
                doesthisshitwork: true,
              });
           });
  }

  getTracksByPlaylistID () {
    console.log('method initiates');
    request.get('api/tracks/byPlaylist/:id')
           .then((response) => {
              console.log('got response');
              console.log(response);
              this.setState({
                doesthisshitwork: true,
              });
           });
  }

  saveTrack () {
    console.log('method initiates');
    const trackDetails = {
      playlistID: 8,
      title: 'Hallelujah',
      artist: 'Rufus Wainwright',
      previewURL: 'i am url and u can too',
    }
    request.post('api/tracks')
           .send(trackDetails)
           .then((response) => {
              console.log('got a response');
              console.log(response);
              this.setState({
                doesthisshitwork: true,
              });
           });
  }

  render () {
    return (
      <div>
        {this.state.doesthisshitwork ? <h1>WE GOT SOMETHING</h1> : false}
      </div>
    );
  }
}
