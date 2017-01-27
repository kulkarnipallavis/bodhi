import React from 'react'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const MapComponent = withGoogleMap(props => (
  <GoogleMap
    ref={ props.onMapLoad }
    defaultZoom={9}
    defaultCenter={{ lat: 40.6944, lng: -73.9213 }}>
    { props.markers && props.markers.map((marker, index) => <Marker key={index} position={marker.position}/>) }
  </GoogleMap>
  )
)

export default MapComponent
