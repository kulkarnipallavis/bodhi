import React from 'react'
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'

const MapComponent = withGoogleMap(props => (
  <GoogleMap
    ref={ props.onMapLoad }
    defaultZoom={9}
    defaultCenter={{ lat: 40.6944, lng: -73.9213 }}>
    { props.markers && props.markers.map((marker, index) => 
    	<Marker 
    	 key={index} 
    	 position={marker.position}
    	 onClick={() => props.onMarkerClick(marker)}
    	 >
    	   {marker.showDesc && (
    	     <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
    	       { <div>
	    	       	 <h2>{marker.title}</h2>
	    	         <h3 id="description">{marker.description}</h3>
    	         </div>
    	       }
    	     </InfoWindow>
    	   )}
    	 </Marker>
    	)}
  </GoogleMap>
  )
)

export default MapComponent
