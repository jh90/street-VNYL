import React from 'react';
import { Link } from 'react-router';
import { GoogleMap, GoogleMapLoader, Marker, SearchBox } from 'react-google-maps';
import request from 'superagent';
import cookie from 'react-cookie';
import UserAuth from './UserAuth.jsx';
import NavBar from './NavBar.jsx';

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
  loggedInLink() {
      return (
        <div>
          <Link to="/login" id="login">Login</Link>
        </div>
      );
  }
  render() {
    return (
      <div id="container">
        <div>
          <NavBar />
          {this.loggedInLink()}
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

