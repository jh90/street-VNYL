import React from 'react';
import { Link } from 'react-router';
import { GoogleMap, GoogleMapLoader, Marker, SearchBox } from 'react-google-maps';
import request from 'superagent';
import cookie from 'react-cookie';
import UserForm from './UserForm.jsx';

export default class UserAuth extends React.Component {
  constructor() {
    super();
    this.state = {
      playlists: [],
    };

    this.logIn = this.logIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.signOut = this.signOut.bind(this);
    this.sendPlaylist = this.sendPlaylist.bind(this);
  }
  componentDidMount() {
    this.updateAuth();
    if (cookie.load('token')) {
      this.getCurrentUserPlaylists();
    }
  }
  getCurrentUserPlaylists() {
    request.get('/api/playlists')
           .then((response) => {
             const playlists = response.body;
             this.setState({ playlists });
           })
           .catch(() => {
             this.updateAuth();
           });
  }
  sendPlaylist({ body }) {
    request.post('/api/playlists')
           .send({ body })
           .then(() => {
             this.getCurrentUserPlaylists();
           });
  }
  signOut() {
    request.post('/api/signout')
           .then(() => this.updateAuth());
  }
  updateAuth() {
    this.setState({
      token: cookie.load('token'),
    });
  }
  logIn(userDetails) {
    request.post('/api/login')
          .send(userDetails)
         .then(() => {
           this.updateAuth();
           this.getCurrentUserPlaylists();
         });
  }
  signUp(userDetails) {
    request.post('/api/signup')
          .send(userDetails)
          .then(() => {
            this.updateAuth();
            this.getCurrentUserPlaylists();
          });
  }
  render() {
    let userDisplayElement;
    if (this.state.token) {
      userDisplayElement = (
        <div>
          <button onClick={this.signOut}>Log-Out</button>
        </div>
      );
    }
    // else {
    //   userDisplayElement = (
    //     <div>
    //       <UserForm handleSubmit={this.logIn} buttonText="Log-In" />
    //       <UserForm handleSubmit={this.signUp} buttonText="Register" />
    //     </div>
    //   );
    // }
    return (
      <div id="user-display">
        <div>
          {userDisplayElement}
        </div>
      </div>
    );
  }
}

