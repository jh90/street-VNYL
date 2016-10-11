import React from 'react';
import { Link } from 'react-router';
import { GoogleMap, GoogleMapLoader, Marker, SearchBox } from 'react-google-maps';

export default class MarkerPin extends React.Component {
  constructor() {
    super();
    this.state = {
      markers: [{
        position: {
         lat: 40.78,
          lng: -73.96,
        },
        key: 'NYC',
        defaultAnimation: 2,
      }],
    };
    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleMarkerRightClick = this.handleMarkerRightClick.bind(this);
}
  handleMapLoad(map) {
    this._mapComponent = map;
    if (map) {
      console.log(map.getZoom());
    }
  }

  /*
   * This is called when you click on the map.
   * Go and try click now.
   */
  handleMapClick(event) {
    const nextMarkers = [
      ...this.state.markers,
      {
        position: event.latLng,
        defaultAnimation: 2,
        key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
      },
    ];
    this.setState({
      markers: nextMarkers,
    });

    if (nextMarkers.length === 3) {
      this.props.toast(
        'Right click on the marker to remove it',
        'Also check the code!'
      );
    }
  }

  handleMarkerRightClick(targetMarker) {
    /*
     * All you modify is data, and the view is driven by data.
     * This is so called data-driven-development. (And yes, it's now in
     * web front end and even with google maps API.)
     */
    const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
    this.setState({
      markers: nextMarkers,
    });
  }

  render() {
    return (
      <div style={{ height: '90%' }}>
        <GoogleMap
          containerElement={
            <div style={{ height: '90%' }} />
          }
          mapElement={
            <div style={{ height: '90%' }} />
          }
          onMapLoad={this.handleMapLoad}
          onMapClick={this.handleMapClick}
          markers={this.state.markers}
          onMarkerRightClick={this.handleMarkerRightClick}
        />
      </div>
    );
  }
}
