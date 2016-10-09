import React from 'react';
import { GoogleMap, GoogleMapLoader, Marker, SearchBox } from 'react-google-maps';
import request from 'superagent';
import cookie from 'react-cookie';
import UserForm from './UserForm.jsx';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      playlists: [],
      user: '',
      data: [],
    };

      this.logIn = this.logIn.bind(this);
      this.signUp = this.signUp.bind(this);
      this.signOut = this.signOut.bind(this);
      this.sendPlaylist = this.sendPlaylist.bind(this);
  };
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
    } else {
      userDisplayElement = (
        <div>
          <UserForm handleSubmit={this.signUp} buttonText="Sign-Up" />
          <UserForm handleSubmit={this.logIn} buttonText="Log-In" />
        </div>
      );
    }
    return (
      <div id="container">
        <div>
         {userDisplayElement}
        </div>
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
                defaultZoom={12}
                defaultCenter={{ lat: 40.78, lng: -73.96 }}
              >
               {
                  this.state.data.map((place, idx) => {
                    console.log(place.long);
                    return (
                      <Marker
                        position={{
                          lat: place.lat,
                          lng: place.long,
                        }}
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




