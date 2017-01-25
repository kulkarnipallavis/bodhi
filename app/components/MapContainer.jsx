import React from 'react'
import MapComponent from './MapComponent'


export default class MapContainer extends React.Component {


  render() {

    return(
        <div style={{ height: '100%' }}>
        <MapComponent
          containerElement={  <div style={{ height: '100vh', width: 'auto '}} />  }
          mapElement={  <div style={{ height: '100vh', width: '100vw '}} />  }

        />
        </div>
    )
  }
}
