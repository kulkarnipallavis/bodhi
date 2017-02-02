import React, { Component, PropTypes } from 'react'
import MapComponent from './MapComponent'
import { connect } from 'react-redux'

import { getMarkers, getUserLocation, setSelectedMarker } from '../reducers/map'
import {browserHistory} from 'react-router'

class MapContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      markers: props.markers
    }

    this.handleMarkerClick = this.handleMarkerClick.bind(this)
    this.handleMarkerClose = this.handleMarkerClose.bind(this)
    this.handleMapLoad = this.handleMapLoad.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)
  }

  componentDidMount() {
    this.props.getMarkers()
    this.props.getUserLocation()
  }

  handleMapLoad(map) {
    this._mapComponent = map
    if (map) map.getZoom()
  }

  handleMarkerClick(targetMarker) {
    this.setState({
      markers: this.props.markers.map(marker => {
        if (marker === targetMarker) marker.showDesc = true
        else marker.showDesc = false
      })
    })
    this.props.setSelectedMarker(targetMarker)
  }

  handleMarkerClose(targetMarker) {
    this.setState({
     markers: this.props.markers.map(marker => {
       if (marker === targetMarker) marker.showDesc = false
       return marker;
     })
    })
  }

  handleButtonClick() {
    browserHistory.push('/offerhelp')
  }

  render() {

    return (
      <div className="flex-row">
        <MapComponent
          containerElement={  <div style={{ height: '100vh', width: '100%' }} />  }
          mapElement={  <div style={{ height: '100%', width: '100%' }} />  }
          onMapLoad={this.handleMapLoad}
          markers={this.props.markers}
          center={this.props.center}
          onMarkerClick={this.handleMarkerClick}
          onMarkerClose={this.handleMarkerClose}
          handleButtonClick={this.handleButtonClick} />
      </div>
    )
  }
}

MapContainer.propTypes = {
  center: PropTypes.object,
  markers: PropTypes.array,
  getMarkers: PropTypes.func,
  setSelectedMarker: PropTypes.func,
  getUserLocation: PropTypes.func
}

const mapStateToProps = (state) => ({
  markers: state.map.markers,
  center: state.map.center
})

const mapDispatchToProps = dispatch => ({
  getMarkers: () => dispatch(getMarkers()),
  getUserLocation: () => dispatch(getUserLocation()),
  setSelectedMarker: (marker) => dispatch(setSelectedMarker(marker))
})

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)
