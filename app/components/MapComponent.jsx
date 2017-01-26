import React from 'react'
import { withGoogleMap, GoogleMap } from 'react-google-maps'

const MapComponent = withGoogleMap(props => (
  <div>
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={14}
    defaultCenter={{ lat: 40.6944, lng: -73.9213 }}/>
  </div>
))

export default MapComponent
