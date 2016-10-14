import React from 'react';
import request from 'superagent';
import { Link } from 'react-router';
import { GoogleMap, GoogleMapLoader, Marker, SearchBox } from 'react-google-maps';
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
    };
  }

  componentDidMount () {
    this.getAllPlaylists();
  }

  requestLocation() {
       navigator.geolocation.getCurrentPosition((pos) => {
           const currentLng = pos.coords.longitude;
           const currentLat = pos.coords.latitude;
           return {lat: currentLat, lng: currentLng};
       });
   }

  dropMarker () {
    const currentLocation = this.requestLocation();
  }

  getAllPlaylists () {
    request.get('/api/playlists')
           .then((response) => {
              const playlistArray = response.body;
              const playlistLocations = playlistArray.map((playlist) => {
                const playlistLat = playlist.lat;
                const playlistLng = playlist.lng;
                return {lat: playlistLat, lng: playlistLng};
              });
              this.setState({
                positionData: playlistLocations,
              });
           });
  }

  render() {
    return (
      <div id="container">
        <div>
          <NavBar handleNewMarker={this.dropMarker}/>
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
                  this.state.positionData.map((coordinates) => {
                    return (
                      <Marker
                        position={{
                          lat: coordinates.lat,
                          lng: coordinates.lng,
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
