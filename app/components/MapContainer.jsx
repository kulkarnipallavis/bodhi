import React from 'react'
import MapComponent from './MapComponent'
import _ from 'lodash'


export default class MapContainer extends React.Component {

  constructor(props) {
    super(props)

    this.handleMapLoad = this.handleMapLoad.bind(this)
  }


  handleMapLoad(map) {
    this._mapComponent = map;
    if (map) {
      console.log(map.getZoom());
    }
  }
  render() {

    return(
        <div style={{ height: '100%' }}>
        <MapComponent
          containerElement={  <div style={{ height: '100vh', width: 'auto '}} />  }
          mapElement={  <div style={{ height: '100vh', width: '100vw '}} />  }
          onMapLoad={this.handleMapLoad}
        />
        </div>
    )
  }
}
