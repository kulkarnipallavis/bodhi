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

    return(
      <MapComponent
        containerElement={  <div style={{ height: '90vh', width: '100%'}} />  }
        mapElement={  <div style={{ height: '100%', width: '100%'}} />  }
        onMapLoad={this.handleMapLoad}
        markers={this.props.markers}
      />
    )
  }
}

const mapStateToProps = (state) => ({ markers: state.markers })
const mapDispatchToProps = { getMarkers }

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)
