import React, { Component } from 'react'
import MapComponent from './MapComponent'
import { connect } from 'react-redux'
import { getMarkers } from '../reducers/map'

class MapContainer extends Component {

  constructor(props) {
    super(props)
    this.handleMapLoad = this.handleMapLoad.bind(this)
  }

  componentDidMount() {
    this.props.getMarkers()
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

const mapStateToProps = (state) => ({ markers: state.markers })
const mapDispatchToProps = { getMarkers }

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)
