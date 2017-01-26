import React, { Component } from 'react'
import MapComponent from './MapComponent'

export default class MapContainer extends Component {

  constructor(props) {
    super(props)

    this.handleMapLoad = this.handleMapLoad.bind(this)
  }

  handleMapLoad(map) {
    this._mapComponent = map
    if (map) map.getZoom()
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
      <MapComponent
        containerElement={  <div style={{ height: '100vh', width: 'auto' }} />  }
        mapElement={  <div style={{ height: '100vh', width: '100vw' }} />  }
        onMapLoad={this.handleMapLoad}/>
      </div>
    )
  }
}
