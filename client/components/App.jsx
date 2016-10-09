import React from 'react';
import { Link } from 'react-router';
import { GoogleMap, GoogleMapLoader, Marker, SearchBox } from 'react-google-maps';
import request from 'superagent';
import cookie from 'react-cookie';
import UserAuth from './UserAuth.jsx';

const propTypes = {
  children: React.PropTypes.element,
};

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      data: [],
      loggedIn: false,
    };
  }
  loggedInLinks() {
    if(!this.state.loggedIn) {
      return (
        <div>
          <Link to="/login" id="login">Login / </Link>
          <Link to="/register" id="register">Register</Link>
        </div>
      );
    } else {
      return (
        <div id="sign-out">
          <Link id="signOut" to="/" onClick={this.signOut}>Sign Out</Link>
        </div>
      );
    }
  }
  render() {
    return (
      <div id="container">
        <div>
          {this.loggedInLinks()}
          {this.props.children}
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

App.propTypes = propTypes;

