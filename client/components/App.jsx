import React from 'react';
import { GoogleMap, GoogleMapLoader, Marker, SearchBox } from 'react-google-maps';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      data: [],
    };
  }
  render() {
    let map;
    return (
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
    );
  }
}


