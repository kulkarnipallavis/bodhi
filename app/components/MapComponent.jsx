import React from 'react'
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import Avatar from 'material-ui/Avatar'
import FlatButton from 'material-ui/FlatButton'
import { Link } from 'react-router'

const MapComponent = withGoogleMap(props => (
   props.center.lat ?
    <GoogleMap
      ref={props.onMapLoad}
      defaultZoom={14}
      defaultCenter={props.center}
      options={{mapTypeControl: false}}
    >
    { props.markers.length && props.markers.map((marker, index) => (
        <Marker
         key={index}
         position={marker.position}
         onClick={() => props.onMarkerClick(marker)}
         icon={
           marker.status === 'pending'
            ? '/img/purple-marker-map.svg'
            : '/img/red-marker-map.svg'
         }
        >
         { marker.showDesc &&
           <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
             { <div>
                 <div className="flex-row">
                   <Avatar className="avatar-iw" size={48} src={marker.requester.picture} />
                 </div>
                 <div className="flex-row flex-row-iw">
                   <Link to={`/profile/${marker.uid}`}>
                     <h3 className="italic">{marker.requester.name}</h3>
                   </Link>
                 </div>
                 <div className="flex-row flex-row-iw">
                   <h3>{marker.title}</h3>
                 </div>
                 <h4 id="description">{`Details: ${marker.description}`}</h4>
                 <div className="flex-row">
                   <FlatButton
                     type="button"
                     onClick={props.handleInfoButtonClick}
                     className="info-window-button"
                     backgroundColor="#533BD7">
                     Offer Help
                   </FlatButton>
                 </div>
               </div> }
           </InfoWindow> }
         </Marker>
        )
      )}
    </GoogleMap>
    :
    <div />
  )
)

export default MapComponent
