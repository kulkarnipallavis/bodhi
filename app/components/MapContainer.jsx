import React, { Component, PropTypes } from 'react'
import MapComponent from './MapComponent'
import { connect } from 'react-redux'
import { getMarkers } from '../reducers/map'

class MapContainer extends Component {

  constructor(props) {
    super(props)

    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleMarkerClose = this.handleMarkerClose.bind(this);
    this.handleMapLoad = this.handleMapLoad.bind(this)
  }

  componentDidMount() {
    this.props.getMarkers()
  }

  handleMapLoad(map) {
    this._mapComponent = map
    if (map) map.getZoom()
  }

    handleMarkerClick(targetMarker) {
       this.setState({
         markers: this.props.markers.map(marker => {
           if (marker === targetMarker) marker.showDesc = true
      })
    })
  }

  handleMarkerClose(targetMarker) {
   this.setState({
     markers: this.props.markers.map(marker => {
       if (marker === targetMarker) marker.showDesc = false
       return marker;
     }),
   })
  }

  render() {
    return (
      <MapComponent
        containerElement={  <div style={{ height: '90vh', width: '100%' }} />  }
        mapElement={  <div style={{ height: '100%', width: '100%' }} />  }
        onMapLoad={this.handleMapLoad}
        markers={this.props.markers}
        onMarkerClick={this.handleMarkerClick}
        onMarkerClose={this.handleMarkerClose}
      />
    )
  }
}

MapContainer.propTypes = {
  markers: PropTypes.array,
  getMarkers: PropTypes.func
}

const mapStateToProps = (state) => ({ markers: state.map.markers })
const mapDispatchToProps = { getMarkers }

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)
