import React from 'react'
import { withGoogleMap, GoogleMap, InfoWindow, Marker } from 'react-google-maps'

const MapComponent = withGoogleMap(props => {

return(
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={9}
    defaultCenter={{ lat: 40.6944, lng: -73.9213 }}
  >
  {props.markers.map(marker => (
        <Marker
          position={marker.position}
        />
  ))}
  </GoogleMap>
  )

})

export default MapComponent
