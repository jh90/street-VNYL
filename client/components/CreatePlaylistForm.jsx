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
  }

  componentDidMount () {
    this.getAllPlaylists();
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
    const metaList = [];
    request.get('/api/playlists')
           .then((response) => {
              console.log('got response');
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
