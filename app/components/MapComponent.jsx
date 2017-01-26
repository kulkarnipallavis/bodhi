import React from 'react'
import { withGoogleMap, GoogleMap, InfoWindow, Marker } from 'react-google-maps'

const MapComponent = withGoogleMap(props => {
console.log("^^^^^^^^^props", props);
return(
  <div>hey
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={14}
    defaultCenter={{ lat: 40.6944, lng: -73.9213 }}
  > 
 
  </GoogleMap>
  </div>
  )

})

export default MapComponent
