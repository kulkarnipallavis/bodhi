import React from 'react'
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'

const MapComponent = withGoogleMap(props => {

return (
 props.center.lat ?
  (<GoogleMap
    ref={ props.onMapLoad }
    defaultZoom={14}
    defaultCenter={props.center}>
    { props.markers && props.markers.map((marker, index) =>

      <Marker
       key={index}
       position={marker.position}
       onClick={() => props.onMarkerClick(marker)}
       icon={(marker.status === 'pending') ? 'purple.png' : null}
       >
         {marker.showDesc && (
           <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
             { <div>
                 <h2>{marker.title}</h2>
                     {
                     //{marker.requester.picture}
                    }
                     <h3>from: {marker.requester.name}</h3>
                 <h3 id="description">{marker.description}</h3>
                 <button type="button" onClick={props.handleButtonClick}>Offer Help</button>
               </div>
             }
           </InfoWindow>
         )}
       </Marker>

      )}
  </GoogleMap>)
     : (<div></div>)
  )
})

export default MapComponent
