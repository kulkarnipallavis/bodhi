import React from 'react'
import { withGoogleMap, GoogleMap, InfoWindow, Marker } from 'react-google-maps'

const InitialMap = withGoogleMap(props => {

return (
  <GoogleMap
    //ref={}
    defaultZoom={14}
    defaultCenter={{ lat: 40.6944, lng: -73.9213 }}
  />


  )

})

export default InitialMap
