import React from 'react';
import { GoogleMap } from 'react-google-maps';
// import { GoogleMapLoader } from 'react-google-maps';

export default class App extends React.Component {
  constructor() {
    super();
  }
  render() {
    let map;
    return (
      <div className='map'>
         <GoogleMap
                containerProps={{
                  style: {
                    height: '100%',
                  },
                }}
                defaultZoom={12}
                defaultCenter={{ lat: 40.78, lng: -73.96 }}
              >
          </GoogleMap>
      </div>
    );
  }
}

// <div>
//       <GoogleMapLoader
//         containerElement={<div />}
//         googleMapElement={
//           <GoogleMap
//             defaultZoom={3}
//             defaultCenter={{lat: -25.363882, lng: 131.044922}}
//           >

//           </GoogleMap>
//         }
//       />
//       </div>
